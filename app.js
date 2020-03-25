const express = require('express');
const cors = require('cors');
const app = express();

app.set('ip', '0.0.0.0');
app.set('port', 3000);
app.set('trust proxy', true) // añadir configuracion al nginx
app.disable('x-powered-by');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const connectionString = `mongodb://localhost:27017/vulndb`

mongoose.connection.on('error', err => {
    console.log("can't connect to mongo db");
    console.log(err);
});

const mongoOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(connectionString, mongoOptions)


//routes
const routes = require('./routes');
routes.init(express, app);


//start server
const server = app.listen(app.get('port'), app.get('ip'), function() {
    console.log('Server running in http://%s:%s', app.get('ip'), app.get('port'))
    console.log(app.get('env'));
});

module.exports = server;