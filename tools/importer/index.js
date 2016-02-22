"use strict";

var path = require("path");

module.exports = function (file, prev) {
    if (file === "normalize") {
        file = path.resolve("node_modules/normalize-scss/sass/normalize");
    }

    if (file === "support-for" && prev.indexOf("normalize") > -1) {
        file = path.resolve("node_modules/normalize-scss/node_modules/support-for/sass/support-for");
    }

    return {
        file: file
    };
};
