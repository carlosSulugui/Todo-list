const express = require('express');
const path = require('path');
const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/components'));

app.use(express.static(path.join(__dirname, '/components')));
app.use(require(path.join(__dirname, '/routes/login.routes')));
app.use(require(path.join(__dirname, '/routes/account.routes')));


app.get((req,res) => {
    res.sendFile(path.join(__dirname, '/components/index.html'));
});

app.listen(3000, (req,res) => {
    console.log('Server on http://localhost:3000');
});