/* REPOSITORY */
const vulnRepo = require('../repository/vuln.repository')

const unscape = require('unscape-html')

/* SCRAPING */
const vulnScrap = require('../scraping/vuln.scrap')

const cheerio = require('cheerio')


const controller = {

    inicializarExtraccion: async(cves) => {

        const pageHTML = await vulnScrap.getDataFromPage(cves)

        const $ = cheerio.load(pageHTML);

        const vuln = {
            title: $('.page-title').html().trim(),
            vulnType: $('.node-body .field-type .field-items .field-item').html().trim(),
            severity: $('.node-body .field-name-field-gravedad-txt .field-items .field-item .level-text').html().trim(),
            publishAt: Date,
            modifyAt: Date,
            description: String,
            affectsTo: String,
            solutions: String
        }

        const type = $('.node-body .field-name-field-gravedad-txt .field-items .field-item .level-text').html()

        console.log(unscape(type));


    }



}

module.exports = controller