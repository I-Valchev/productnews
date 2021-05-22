const Nunjucks = require("nunjucks");
const pluginDate = require("eleventy-plugin-date");

module.exports = function(eleventyConfig) {
    const nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("_includes")
    );

    eleventyConfig.addPlugin(pluginDate);

    eleventyConfig.addNunjucksFilter("date", function(iso) {
        return (new Date(iso)).toDateString();
    });

    eleventyConfig.setLibrary("njk", nunjucksEnvironment);
    eleventyConfig.addPassthroughCopy("assets/");
};
