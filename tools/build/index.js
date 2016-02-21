#!/usr/bin/env node

var autoprefixer = require('autoprefixer');
var fs = require("fs");
var glob = require("glob");
var Handlebars = require("handlebars");
var mkdirp = require("mkdirp");
var path = require("path");
var postcss = require('postcss');
var sass =require("node-sass");

glob.sync("source/partials/**/*.hbs")
    .forEach(function (file) {
        var source = fs.readFileSync(file).toString();

        Handlebars.registerPartial(file.replace(".hbs", ""), source)
    })

glob.sync("source/pages/**/*.hbs")
    .forEach(function (file) {
        var source = fs.readFileSync(file).toString()
            template = Handlebars.compile(source),
            distDirectory = path.dirname(file).replace("source" + path.sep + "pages", "dist"),
            distPath = distDirectory + path.sep + path.basename(file, ".hbs") + ".html";

        mkdirp.sync(distDirectory);
        fs.writeFileSync(distPath, template());
    });
