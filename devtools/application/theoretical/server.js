const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static('public'));

app.get('/set-server-cookie', (req, res) => {
    res.cookie('serverCookie', 'This is a server-side cookie');
    res.send('Server-side cookie has been set');
});

app.get('/get-server-cookie', (req, res) => {
    res.send(`Server-side cookie: ${req.cookies.serverCookie}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});