const routeVuln = require('./api/vuln.routes');


var route = {
    init: (express, app) => {
        var router = express.Router();

        routeVuln.init(router)

        app.use(router);
    }
};

module.exports = route;