const axios = require('axios')


const procesodeextraccion = {
    getByCve: async(cve) => {
        const resourceUrl = `https://www.incibe-cert.es/alerta-temprana/vulnerabilidades/${cve}`

        const response = await axios.get(resourceUrl)

        if (response && response.data) {


            return response.data
        }
    }
}

module.exports = procesodeextraccion;