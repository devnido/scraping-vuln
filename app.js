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

const vulnController = require('./controller/vuln.controller')

cves = ['cve-2020-0655']

vulnController.inicializarExtraccion(cves)
    .then(result => console.log(result))
    .catch(terror => console.log(terror))