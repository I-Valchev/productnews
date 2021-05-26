const Nunjucks = require("nunjucks");
const truncateHtml = require('truncate-html');
const luxon = require('luxon');
const yaml = require('js-yaml');

module.exports = function(eleventyConfig) {
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("_includes")
    );

    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    eleventyConfig.addNunjucksFilter("date", function(dateString, format = 'cccc d LLLL yyyy') {
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

    eleventyConfig.addNunjucksFilter("lower_headings", function(html, levels) {

        if (typeof html === 'undefined') {
            return;
        }

        for(let i = 0; i < levels; ++i) {
            html = html
                .replace(/<h5/g, '<h6').replace(/<\/h5/g, '</h6')
                .replace(/<h4/g, '<h5').replace(/<\/h4/g, '</h5')
                .replace(/<h3/g, '<h4').replace(/<\/h3/g, '</h4')
                .replace(/<h2/g, '<h3').replace(/<\/h2/g, '</h3')
                .replace(/<h1/g, '<h2').replace(/<\/h1/g, '</h2')
        }

        return html;
    });

    eleventyConfig.addNunjucksFilter('truncate_html', function(html, length=20) {
       return truncateHtml(html, length, { byWords: true });
    });

    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    eleventyConfig.addPassthroughCopy("assets/");
};
