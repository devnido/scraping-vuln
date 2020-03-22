const Vuln = require('../models/vuln.model')

const repository = {

    find: () => Vuln.find({}),

    insert: ({ title, vulnType, severity, publishAt, modifyAt, description, affectsTo, solutions }) =>
        Vuln.create({ title, vulnType, severity, publishAt, modifyAt, description, affectsTo, solutions })


}