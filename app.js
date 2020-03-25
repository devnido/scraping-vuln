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

// escribir aqui las vulnerabilidades a buscar
cves = ['CVE-2019-20556', 'CVE-2019-20562', 'CVE-2019-20579', 'CVE-2020-6983', 'CVE-2019-20547', 'CVE-2019-20563']

// 

vulnController.inicializarExtraccion(cves)
    .then(result => console.log(result))
    .catch(terror => console.log(terror))