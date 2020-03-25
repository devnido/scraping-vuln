const vulnRequest = require('../request/vuln.request')
const vulnScrap = require('../scraping/vuln.scraping')
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
                const pageHTML = await vulnRequest.getByCve(cve)


                const data = vulnScrap.scrapeOne(pageHTML)

                if (data) {
                    data.cve = cve

                    toInsert.push(data)

                    console.log(data);
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