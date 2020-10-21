const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoutes = require('./app/routes/register.routes');
const loginRoutes = require('./app/routes/login.routes');
const todoRoutes = require('./app/routes/todo.routes');
const tagRoutes = require('./app/routes/tag.routes');
const userRoutes = require('./app/routes/user.routes');
const configHeroku = require('./app/config-heroku/config.database');
const { use } = require('./app/routes/login.routes');
const port = process.env.PORT || 4000;

app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
});

app.get('/', (req, res) => {
    res.json({"message": "Hello. That is todo note api!"});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.use(registerRoutes);
app.use(loginRoutes);
app.use(todoRoutes);
app.use(userRoutes);
app.use(tagRoutes);

mongoose.connect(configHeroku.url)
.then('DB CONNECTED');

app.listen(port, console.log('app start on port ', port));

