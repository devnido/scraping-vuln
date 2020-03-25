const vulnService = require('../services/vuln.service')
const vulnRepo = require('../repository/vuln.repository')

const controller = {

    getAll: () => {
        return vulnRepo.getAll()
    },

    inicializarExtraccion: async(cves) => {

        const toInsert = []
        const notFound = []

        for (const cve of cves) {

            const exists = await vulnRepo.existsByCve(cve)

            if (exists) {


            } else {

                let data = {}
                const existsIncibe = await vulnService.getDataFromIncibe(cve)

                if (!existsIncibe) {

                    // const existsIncibe = await vulnService.getDataFromIncibe(cve)

                    // if (!existsIncibe) {
                    //     // buscar en mitre

                    //     data = false

                    // } else {
                    //     data = existsIncibe
                    // }

                    data = false

                } else {
                    data = existsIncibe
                }

                if (data) {

                    data.cve = cve


                    toInsert.push(data)

                } else {

                    notFound.push(cve)
                }

            }

        }

        if (toInsert.length > 0) {
            return [await vulnRepo.insertMany(toInsert), notFound]
        } else {
            return [false, notFound];
        }


    }

}

module.exports = controller