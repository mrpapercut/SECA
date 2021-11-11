import express from 'express';

const html = `<!doctype html>
<html>
<head>
<title>EDSM.net helper</title>
</head>
<body>

<script src="dist/app.js" async></script>
</body>
</html>
`;

const app = express();
const port = 7000;

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
    res.send(html);
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
