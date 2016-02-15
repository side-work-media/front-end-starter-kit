#!/usr/bin/env node

var fs = require("fs");
var glob = require("glob");
var Handlebars = require("handlebars");
var path = require("path");

glob("source/!(pages)/**/*.hbs", function (error, files) {
    if (error) {
        console.log(error);
        return;
    }

    files.forEach(function (file) {
        var source = fs.readFileSync(file).toString();

        Handlebars.registerPartial(file.replace(".hbs", ""), source)
    });
})

glob("source/+(pages)/**/*.hbs", function (error, files) {
    files.forEach(function (file) {
        var source = fs.readFileSync(file).toString();
        var template = Handlebars.compile(source);
        var markup = template();
        var pageName = path.dirname(file).split(path.sep).pop();
        var htmlPath = path.join("dist", `${pageName}.html`);
        fs.writeFileSync(htmlPath, markup);
    });
});
