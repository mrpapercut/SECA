const express = require('express');
const bodyParser = require('body-parser');

const html = `<!doctype html>
<html>
<head>
<title>Get nearby systems</title>
</head>
<body>
<form id="inputform">
    <input type="text" id="system">
    <input type="range" id="range" value="50" min="0" max="200" step="10"><div id="rangeval">50</div>
    <button>Submit</button>
</form>
<div id="result"></div>
<script>
const queryendpoint = 'http://localhost:7002/query';
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
            .map(el => (id = null, text = '') => { const a = document.createElement(el); a.id = id; a.innerText = text; return a });

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
        return;
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
        resdiv.innerText = 'System not found!';
        return;
    }

    const [currentSystemDiv, csh, cscoor] = ['div', 'h1', 'em'].map(el => document.createElement(el));
    csh.innerText = system.name;
    currentSystemDiv.appendChild(csh);
    cscoor.innerText = \`x: \${system.coords.x}, y: \${system.coords.y}, z: \${system.coords.z}\`;
    currentSystemDiv.appendChild(cscoor);
    resdiv.appendChild(currentSystemDiv);
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

    const sortedNearby = sortByDistance((nearbyjson instanceof Array ? nearbyjson : []).map(c => c._source));

    writeNearby(sortedNearby);
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

        await findSystem(systeminput.value);
    })
});
</script>
</body>
</html>
`;

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(html);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
