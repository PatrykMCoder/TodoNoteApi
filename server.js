const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoutes = require('./app/routes/register.routes');
const loginRoutes = require('./app/routes/login.routes');
const todoRoutes = require('./app/routes/todo.routes');
const tagRoutes = require('./app/routes/tag.routes');
const userRoutes = require('./app/routes/user.routes');
const configLocal = require('./app/config-local/config.database');
const { use } = require('./app/routes/login.routes');
const port = process.env.PORT || 4000;
const os = require('os');
const path = require('path');

app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type");
    next();
});

app.get('/', (req, res) => {
    res.json({"message": "Hello. That is todo note api!"});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.text({defaultCharset: 'utf-8'}));

app.use('/public', express.static(__dirname + '/app/public') );

app.use(registerRoutes);
app.use(loginRoutes);
app.use(todoRoutes);
app.use(userRoutes);
app.use(tagRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

if ((process.env.NODE_ENV || '').trim() === 'production') {
    mongoose.connect(process.env.mdburl)
    .then(console.log('DB CONNECTED'));    
}else {
    mongoose.connect(configLocal.url)
    .then(console.log('DB CONNECTED'));
}

app.listen(port, console.log('app start on port ', port));

