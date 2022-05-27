const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');const path = require('path');
const app = express();

//middleware
const csrfMiddleware = csrf({cookie:true});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(csrfMiddleware);

app.all('*', (req,res,next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/components'));



app.use(express.static(path.join(__dirname, '/components')));
app.use(require(path.join(__dirname, '/routes/startPage.routes')));
app.use(require(path.join(__dirname, '/routes/login.routes')));
app.use(require(path.join(__dirname, '/routes/account.routes')));
app.use(require(path.join(__dirname,'/routes/profile.routes')));
app.use(require(path.join(__dirname, '/routes/deleteTask.routes')));
app.use(require(path.join(__dirname, '/routes/editTask.routes')));
app.use(require(path.join(__dirname, '/routes/todaysTask.routes')));
app.use(require(path.join(__dirname, '/routes/incompletedTask.routes')));
app.use(require(path.join(__dirname, '/routes/statistics.routes')));
app.use((req,res) => {
    res.sendFile(path.join(__dirname, '/components/error.html'));
});


app.listen(3000, (req,res) => {
    console.log('Server on http://localhost:3000');
});