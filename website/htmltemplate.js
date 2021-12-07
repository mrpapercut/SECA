module.exports = () => `<!doctype html>
<html>
<head>
    <title>SECA - SuperElite Companion App for Elite Dangerous</title>
    <link rel="icon" href="assets/seca-small-logo.png">
    <style>
        body {
            background: rgb(30, 30, 30);
            color: #fff;
            font-family: monospace;
        }
        #logo {
            background: url('assets/seca-logo.png') no-repeat;
            width: 300px;
            height: 160px;
            margin: 5% auto 0;
        }
        #comingsoon {
            margin: 0 auto;
            width: 300px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="logo"></div>
    <div id="comingsoon">SECA<br>Companion app for Elite Dangerous<br>Launching in 3308</div>
</body>
</html>
`;