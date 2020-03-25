const cheerio = require('cheerio')
const unscape = require('unscape-html')

const scraping = {
    scrapeOneFromIncibe: (pageHTML) => {
        const $ = cheerio.load(pageHTML);

        const pageTitle = $('.page-title[title="Vulnerabilidades"] a').text()

        if (pageTitle !== 'Vulnerabilidades') {
            const affectsTo = []
            $('.node-body .field-versions .field-items .field-item .version_list li').toArray().map(i => affectsTo.push($(i).html()))

            const solutions = []
            $('.node-body .field-references .field-items .field-item .references_list li').toArray().map(i => solutions.push($(i).find('a').html()))

            const vuln = {
                title: unscape($('.page-title').html().trim()),
                vulnType: unscape($('.node-body .field-type .field-items .field-item').html().trim()),
                severity: unscape($('.node-body .field-name-field-gravedad-txt .field-items .field-item .level-text').html().trim()),
                publishAt: parseDate($('.node-body .field-name-field-fecha-publicacion .field-items .field-item .date-display-single').html().trim()),
                modifyAt: parseDate($('.node-body .field-name-field-fecha-modificacion .field-items .field-item .date-display-single').html().trim()),
                description: unscape($('.node-body .field-description .field-items .field-item').html()),
                accessVector: unscape($('.node-body .field-impact .field-items .field-item:nth-child(1)').text()).split(':')[1].trim(),
                accessComplexity: unscape($('.node-body .field-impact .field-items .field-item:nth-child(2)').text()).split(':')[1].trim(),
                auth: unscape($('.node-body .field-impact .field-items .field-item:nth-child(3)').text()).split(':')[1].trim(),
                impactType: unscape($('.node-body .field-impact .field-items .field-item:nth-child(4)').text()).split(':')[1].trim(),
                affectsTo: affectsTo,
                solutions: solutions
            }

            return vuln;
        } else {
            return false;
        }


    },
    scrapeOneFromNist: (pageHTML) => {
        const $ = cheerio.load(pageHTML);

        const serviceUnavailable = $('#page-content div h2').text().trim()

        if (!serviceUnavailable.includes('CVE ID Not Found')) {

            const affectsTo = []
            $('.node-body .field-versions .field-items .field-item .version_list li').toArray().map(i => affectsTo.push($(i).html()))

            const solutions = []
            $('.node-body .field-references .field-items .field-item .references_list li').toArray().map(i => solutions.push($(i).find('a').html()))

            const vuln = {
                title: unscape($('span[data-testid="page-header-vuln-id"]').html().trim()),
                vulnType: 'No disponible / Otro tipo',
                severity: String,
                publishAt: Date,
                modifyAt: Date,
                description: String,
                accessVector: String,
                accessComplexity: String,
                auth: String,
                impactType: String,
                affectsTo: affectsTo,
                solutions: solutions
            }

            return vuln;
        } else {
            return false;
        }

        return false;
    }

}

module.exports = scraping;




function parseDate(date) {
    const parts = date.split('/');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    const newDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));


    return newDate

}