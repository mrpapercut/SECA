const template = `<!doctype html>
<html>
<head>
<title>Get nearby systems</title>
<script src='https://cdn.plot.ly/plotly-2.8.3.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'></script>
<style>
body {
    background: #333;
    color: #fff;
    font-family: "Open Sans", verdana, arial, sans-serif;
}
table {
    border-spacing: 1rem;
}
th {
    text-align: left;
}
</style>
</head>
<body>
<form id="inputform">
    <input type="text" id="system">
    <input type="range" id="range" value="50" min="0" max="200" step="5"><div id="rangeval">50</div>
    <button>Submit</button>
</form>
<div id="cursysresult"></div>
<div id="plotdiv"></div>
<div id="result"></div>
<script>
const queryendpoint = 'http://localhost:7002/query';
const cursysresdiv = document.getElementById('cursysresult');
const resdiv = document.getElementById('result');

let _currentSystem = {};
let _range = 50;

const calculateDistance = (a, b) => {
    const distance = Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2) + Math.pow((b.z - a.z), 2));

    return parseFloat(distance.toFixed(2));
}

const getSurroundingSystemsQuery = (coords, range = 10) => {
    if (!Object.keys(coords).includes('x') || !Object.keys(coords).includes('y') || !Object.keys(coords).includes('z') || Object.keys(coords).length !== 3) {
        console.error('Invalid coordinates-object provided');
        return;
    }

    const defObj = {
        "query": {
            "bool": {
                "must": []
            }
        },
        "size": 100
    }

    range = parseInt(range, 10);

    const minmax = c => {
        return [c - range, c + range]
    };

    for (let i in coords) {
        const [min, max] = minmax(coords[i]);

        defObj.query.bool.must.push({
            "range": {
                [\`coords.\${i}\`]: {
                    "gte": min,
                    "lte": max
                }
            }
        });
    }

    return defObj;
}

const writeNearby = nearbySystems => {
    const [table, thead, th, tbody, tr, td]
        = ['table', 'thead', 'th', 'tbody', 'tr', 'td']
            .map(el => (id = null, text = '') => { const a = document.createElement(el); if (id) a.id = id; a.innerText = text; return a });

    const nbh = document.createElement('h2');
    nbh.innerText = \`\${nearbySystems.length} systems found\`;
    resdiv.appendChild(nbh);

    const nbTable = table('nearby');
    const nbThead = thead();
    const [nbthName, nbthDist, nbthCoor, nbthRelCoor] = [th(null, 'Name'), th(null, 'Distance'), th(null, 'Coordinates'), th(null, 'Relative coordinates')];
    [nbthName, nbthDist, nbthCoor, nbthRelCoor].forEach(t => nbThead.appendChild(t));
    nbTable.appendChild(nbThead);

    const nbBody = tbody()
    const _td = val => td(null, val);
    nearbySystems.forEach(sys => {
        const row = tr();
        row.appendChild(_td(sys.name));
        row.appendChild(_td(sys.distance));
        row.appendChild(_td(\`x: \${sys.coords.x}, y: \${sys.coords.y}, z: \${sys.coords.z}\`));
        const rel_coords = \`x: \${sys.coords.x - _currentSystem.coords.x}, y: \${sys.coords.y - _currentSystem.coords.y}, z: \${sys.coords.z - _currentSystem.coords.z}\`;
        row.appendChild(_td(rel_coords));

        nbBody.appendChild(row);
    });

    nbTable.appendChild(nbBody);
    resdiv.appendChild(nbTable);
}

const sortByDistance = (nearbySystems = []) => {
    if (nearbySystems.length < 1) {
        const errdiv = document.createElement('div');
        errdiv.innerText = 'No nearby systems found, try increasing the range';
        resdiv.appendChild(errdiv);

        return [];
    }

    const nearbySystemsWithDistance = nearbySystems.map(s => {
        s.distance = calculateDistance(_currentSystem.coords, s.coords);
        return s;
    });

    const sortedSystems = nearbySystemsWithDistance.sort((a, b) => a.distance - b.distance);

    return sortedSystems;
}

const writeSystem = (system = null) => {
    if (!system) {
        cursysresdiv.innerText = 'System not found!';
        return;
    }

    const [currentSystemDiv, csh, cscoor] = ['div', 'h1', 'em'].map(el => document.createElement(el));
    csh.innerText = system.name;
    currentSystemDiv.appendChild(csh);
    cscoor.innerText = \`x: \${system.coords.x}, y: \${system.coords.y}, z: \${system.coords.z}\`;
    currentSystemDiv.appendChild(cscoor);
    cursysresdiv.appendChild(currentSystemDiv);
}

const findSystem = async systemname => {
    const getsystem = await fetch(queryendpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: {
                query_string: {
                    query: \`name:'\${systemname}'\`
                }
            },
            size: 10
        })
    });

    const systemjson = await getsystem.json();

    _currentSystem = systemjson.map(c => c._source).find(c => c.name === systemname);

    writeSystem(_currentSystem);

    const getnearby = await fetch(queryendpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getSurroundingSystemsQuery(_currentSystem.coords, _range))
    });

    const nearbyjson = await getnearby.json();

    const sortedNearby = sortByDistance((nearbyjson instanceof Array ? nearbyjson : []).map(c => c._source).filter(c => c.name !== systemname));

    if (sortedNearby.length > 0) {
        writeNearby(sortedNearby);
        render3DPlot(sortedNearby);
    }
}

const render3DPlot = rows => {
    const defObj = {
        mode: 'markers+text',
        marker: {
            size: 12,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d',
        text: rows.map(r => r.name),
        hovertext: rows.map(r => \`\${r.name}<br>\${r.distance}ly\`),
        hoverinfo: 'text'
    }

    const nearbySystems = Object.assign({}, defObj, {
        x: rows.map(r => _currentSystem.coords.x - r.coords.x),
        y: rows.map(r => _currentSystem.coords.y - r.coords.y),
        z: rows.map(r => _currentSystem.coords.z - r.coords.z)
    });

    const baseSystem = Object.assign({}, defObj, {
        x: [0],
        y: [0],
        z: [0],
        marker: Object.assign({}, defObj.marker, {
            color: 'rgb(247 134 134)'
        }),
        text: [_currentSystem.name],
        hovertext: [_currentSystem.name]
    })

    var data = [nearbySystems, baseSystem];
    var layout = {
        font: {
            color: '#fff'
        },
        paper_bgcolor: '#333',
        plot_bgcolor: '#333',
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        },
        scene: {
            xaxis: {
                nticks: Math.ceil(_range / 10, 10),
                range: [0 - _range, _range]
            },
            yaxis: {
                nticks: Math.ceil(_range / 10, 10),
                range: [0 - _range, _range]
            },
            zaxis: {
                nticks: Math.ceil(_range / 10, 10),
                range: [0 - _range, _range]
            }
        }
    };

    Plotly.newPlot('plotdiv', data, layout);
}

window.addEventListener('load', () => {
    const form = document.getElementById('inputform');
    const systeminput = document.getElementById('system');
    const rangeinput = document.getElementById('range');
    const rangevaldiv = document.getElementById('rangeval');

    rangeinput.addEventListener('change', e => {
        rangevaldiv.innerText = _range = e.target.value;
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();

        resdiv.innerHTML = '';
        cursysresdiv.innerHTML = '';

        await findSystem(systeminput.value);
    })
});
</script>
</body>
</html>
`;

module.exports = template;
