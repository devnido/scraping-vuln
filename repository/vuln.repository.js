const Vuln = require('../models/vuln.model')

const repository = {

    existsByCve: (cve) => Vuln.exists({ cve }),

    getAll: () => Vuln.find({}),

    insert: ({ title, vulnType, severity, publishAt, modifyAt, description, affectsTo, solutions }) =>
        Vuln.create({ title, vulnType, severity, publishAt, modifyAt, description, affectsTo, solutions }),

    insertMany: data => Vuln.insertMany(data)


}

module.exports = repository