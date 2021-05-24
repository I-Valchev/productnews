const Nunjucks = require("nunjucks");
const truncateHtml = require('truncate-html');
const luxon = require('luxon');
const yaml = require('js-yaml');

module.exports = function(eleventyConfig) {
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("_includes")
    );

    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    eleventyConfig.addNunjucksFilter("date", function(dateString, format = 'cccc L LLLL yyyy') {
        let date;
        if (dateString === 'now') {
            date = luxon.DateTime.now();
        } else {
            date = luxon.DateTime.fromISO(dateString);
        }

        switch(format) {
            case 'iso':
                return date.toISO();
            default:
                return date.toFormat(format);
        }
    });

    eleventyConfig.addNunjucksFilter('truncate_html', function(html, length=20) {
       return truncateHtml(html, length, { byWords: true });
    });

    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    eleventyConfig.addPassthroughCopy("assets/");
};
