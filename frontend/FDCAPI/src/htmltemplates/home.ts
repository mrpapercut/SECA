const homeTemplate = (data = '') => `<!doctype html>
<html>
<head>
<title>FDcAPI checker</title>
<style>

</style>
</head>
<body>
<div id="header">
    <button type="button" id="endpoints">/endpoints</button>
    <button type="button" id="me">/me</button>
    <button type="button" id="profile">/profile</button>
    <button type="button" id="market">/market</button>
    <button type="button" id="shipyard">/shipyard</button>
    <button type="button" id="communitygoals">/communitygoals</button>
    <button type="button" id="fleetcarrier">/fleetcarrier</button>
    <button type="button" id="journal">/journal</button>
    <select id="journal-year">${[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].reverse().map(y => `<option value="${y}">${y}</option>\n`)}</select>
    <select id="journal-month">${new Array(12).fill('').map((c, i) => `<option value="${i + 1}">${(i + 1).toString().padStart(2, '0')}</option>\n`)}</select>
    <select id="journal-day">${new Array(31).fill('').map((c, i) => `<option value="${i + 1}">${(i + 1).toString().padStart(2, '0')}</option>\n`)}</select>
</div>
<pre><code id="result"></code></pre>
<script>
window.addEventListener('load', e => {
    const buttons = [...document.getElementById('header').querySelectorAll('button')];
    const output = document.getElementById('result');

    buttons.forEach(btn => {
        btn.addEventListener('click', async e => {
            e.preventDefault();

            let endpoint = \`/\${e.target.id}\`;

            if (e.target.id === 'journal') {
                const year = document.getElementById('journal-year').value;
                const month = document.getElementById('journal-month').value.padStart(2, 0);
                const day = document.getElementById('journal-day').value.padStart(2, 0);
                endpoint = \`\${endpoint}?year=\${year}&month=\${month}&day=\${day}\`;
            }

            const res = await fetch(endpoint);
            const json = await res.json();

            result.innerText = JSON.stringify(json, null, 2);
        });
    });
});
</script>
</body>
</html>
`;

export default homeTemplate;
