const axios = require('axios')


const procesodeextraccion = {
    getByCveFromIncibe: async(cve) => {
        const resourceUrl = `https://www.incibe-cert.es/alerta-temprana/vulnerabilidades/${cve}`

        const response = await axios.get(resourceUrl)

        if (response && response.data) {


            return response.data
        }
    },

    getByCveFromNist: async(cve) => {
        const resourceUrl = `https://nvd.nist.gov/vuln/detail/${cve}`

        const response = await axios.get(resourceUrl)

        if (response && response.data) {


            return response.data
        }
    },

}

module.exports = procesodeextraccion;