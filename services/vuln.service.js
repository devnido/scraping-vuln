const vulnRequest = require('../request/vuln.request')
const vulnScrap = require('../scraping/vuln.scraping')

const servicio = {

    getDataFromIncibe: async(cve) => {
        const pageHTML = await vulnRequest.getByCveFromIncibe(cve)
        const data = vulnScrap.scrapeOneFromIncibe(pageHTML)

        return data;

    },
    getDataFromNist: async(cve) => {

        const pageHTML = await vulnRequest.getByCveFromNist(cve)
        const data = vulnScrap.scrapeOneFromNist(pageHTML)

        return data;
    }


}

module.exports = servicio