const template = `<!doctype html>
<html>
<head>
    <!-- Load plotly.js into the DOM -->
    <script src='https://cdn.plot.ly/plotly-2.8.3.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'></script>
</head>

<body>
<div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
<script>
d3.json('/public/nearby-test.json', function(err, rows) {
    // const rows = ;
    function unpack(rows, key) {
        return rows.map(function(row)
        { return row['coords'][key]; });}

    const baseSystem = rows.find(s => s.distance === 0);

    /*
    console.log(rows.map(r => {
        r.rel_coords = {};
        r.rel_coords.x = r.coords.x - baseSystem.coords.x;
        r.rel_coords.y = r.coords.y - baseSystem.coords.y;
        r.rel_coords.z = r.coords.z - baseSystem.coords.z;
        return r;
    }));
    */

    var trace1 = {
        x: rows.map(r => baseSystem.coords.x - r.coords.x),
        y: rows.map(r => baseSystem.coords.y - r.coords.y),
        z: rows.map(r => baseSystem.coords.z - r.coords.z),
        // y: unpack(rows, 'y'),
        // z: unpack(rows, 'z'),
        mode: 'markers+text',
        marker: {
            size: 12,
            line: {
            color: 'rgba(217, 217, 217, 0.14)',
            width: 0.5},
            opacity: 0.8},
        type: 'scatter3d',
        text: rows.map(r => r.name),
        hovertext: rows.map(r => \`\${r.name}<br>\${r.distance}ly\`),
        hoverinfo: 'text'
    };

    /*
    var trace2 = {
        x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
        mode: 'markers',
        marker: {
            color: 'rgb(127, 127, 127)',
            size: 12,
            symbol: 'circle',
            line: {
            color: 'rgb(204, 204, 204)',
            width: 1},
            opacity: 0.8},
        type: 'scatter3d'};
    */

    var data = [trace1];
    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        },
        scene: {
            xaxis: {
                nticks: 20,
                range: [-200, 200]
            },
            yaxis: {
                nticks: 20,
                range: [-200, 200]
            },
            zaxis: {
                nticks: 20,
                range: [-200, 200]
            }
        }
    };
    Plotly.newPlot('myDiv', data, layout);
});

</script>
</body>
</html>`;

module.exports = template;
