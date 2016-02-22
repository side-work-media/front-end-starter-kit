"use strict";

var $ = require("jQuery");

var $wrapper,
    $nav,
    height,
    scrollTop;

function hide () {
    $nav.css("top", -height + "px");
}

function show () {
    $nav.css({
        position: "fixed",
        top: 0
    });

    $wrapper.css("padding-top", 0);
}

function onScroll () {
    if (scrollTop <= height) {
        show();
    } else if (scrollTop > $(window).scrollTop()) {
        show();
    } else {
        hide();
    }

    scrollTop = $(window).scrollTop();
}

function init () {
    $wrapper = $("header");
    $nav = $wrapper.find("nav");
    height = $wrapper.outerHeight();

    $wrapper.css("height", height + "px");

    $(window).on("scroll", onScroll);
}

module.exports.init = init;
