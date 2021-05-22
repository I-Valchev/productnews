const Nunjucks = require("nunjucks");
const truncateHtml = require('truncate-html')

module.exports = function(eleventyConfig) {
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("_includes")
    );

    eleventyConfig.addNunjucksFilter("date", function(iso) {
        return (new Date(iso)).toDateString();
    });

    eleventyConfig.addNunjucksFilter('truncate_html', function(html, length=20) {
       return truncateHtml(html, length, { byWords: true });
    });

    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    eleventyConfig.addPassthroughCopy("assets/");
};
