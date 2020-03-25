const vulnController = require("../controller/vuln.controller");

const route = {
    init: router => {

        router.route('/vuln').get(
            async(req, res, next) => {
                try {
                    const vulns = await vulnController.getAll();
                    const response = {
                        ok: true,
                        content: {
                            message: 'Vuln List',
                            vulns,
                            total: vulns.legth
                        }
                    }


                    res.status(200).json(response);

                } catch (error) {

                    next({
                        error: error,
                        status: 500
                    });

                }
            })

        router.route('/vuln').post(
            async(req, res, next) => {

                const { cves } = req.body;

                try {

                    const [added, notFound] = await vulnController.inicializarExtraccion(cves);

                    const response = {
                        ok: true,
                        content: {
                            message: 'Cves added successful',
                            added,
                            totalAdded: added.length,
                            notFound,
                            totalNotFound: notFound.length
                        }
                    }

                    res.status(200).json(response);

                } catch (error) {
                    next({
                        error: error,
                        status: 500
                    })
                }
            })


    }
}

module.exports = route;