/*!
 * log-color-date
 * Copyright(c) 2016 Martijn van Duijneveldt
 * MIT Licensed
 */

'use strict'

var colors = require('./colors-ressources.js');
var keys = require('./key-ressources.js')

module.exports = function (options) {
    console.log(("colors" in options && typeof options.colors === "object"))
    if (typeof options === "object") {
        if (("colors" in options && typeof options.colors === "object") || ("keys" in options && typeof options.key === "object")) {
            for (let color in options.colors) {
                colors[color] = options.colors[color];
            }
            for (let key in options.keys) {
                keys[key] = options.keys[key];
            }
            overwriteConsole();
        } else {
            console.error("An option is missing (key or color)")
        }
    } else {
        console.error("Your option is not an object");
    }
}


var now = function () {
    return "[" + new Date().toLocaleString() + "]";
};

var formatArgs = function (args, color) {
    if (color) {
        if (typeof args[0] === "string" && args[0].indexOf('%') != -1) {
            args[0] = color + now() + " " + args[0];
        } else {
            Array.prototype.unshift.call(args, color + now());
        }
        Array.prototype.push.call(args, colors.reset);
    } else {
        if (typeof args[0] === "string" && args[0].indexOf('%') != -1) {
            args[0] = now() + " " + args[0];
        } else {
            Array.prototype.unshift.call(args, now());
        }
    }
};

var overwriteConsole = function () {

    var oldConsole = {};

    for (let key in keys) {
        oldConsole[key] = console[key];
        console[key] = function () {
            if (typeof oldConsole[key] === "function" && typeof oldConsole[key].apply === "function") {
                formatArgs(arguments, colors[keys[key]]);
                oldConsole[key].apply(this, arguments);
            }
        }
    }
};

overwriteConsole();