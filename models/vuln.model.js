const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vuln = new Schema({
    cve: String,
    title: String,
    vulnType: String,
    severity: String,
    publishAt: Date,
    modifyAt: Date,
    description: String,
    accessVector: String,
    accessComplexity: String,
    auth: String,
    impactType: String,
    affectsTo: [String],
    solutions: [String]

}, {
    timestamps: true
});

const Vuln = mongoose.model('vuln', vuln);

module.exports = Vuln;