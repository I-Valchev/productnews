const Nunjucks = require("nunjucks");
const truncateHtml = require('truncate-html');
const luxon = require('luxon');
const yaml = require('js-yaml');

module.exports = function(eleventyConfig) {
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("_includes")
    );

    eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

    eleventyConfig.addNunjucksFilter("date", function(dateString, format = 'cccc L LLLL yyyy', relative = false) {
        let date;
        if (dateString === 'now') {
            date = luxon.DateTime.now();
        } else {
            date = luxon.DateTime.fromISO(dateString);
        }

       return relative ? date.toRelativeCalendar() : date.toFormat(format);
    });

    eleventyConfig.addNunjucksFilter('truncate_html', function(html, length=20) {
       return truncateHtml(html, length, { byWords: true });
    });

    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    eleventyConfig.addPassthroughCopy("assets/");
};
