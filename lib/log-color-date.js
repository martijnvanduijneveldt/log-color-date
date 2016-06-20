/*!
 * log-color-date
 * Copyright(c) 2016 Martijn van Duijneveldt
 * MIT Licensed
 */

'use strict'

//text colors
var colors = {
    reset: '\u001b[0m',
    red: "\u001b[31m",
    yellow: '\u001b[33m',
    cyan: '\u001b[36m'
}

var oldConsole = {};
oldConsole.log = console.log;
oldConsole.error = console.error;
oldConsole.warn = console.warn;
oldConsole.info = console.info;

var now = function(){
  return "["+ new Date().toLocaleString()+"]";
}

console.log = function(){
  Array.prototype.unshift.call(arguments, now());
  oldConsole.log.apply(this,arguments)
}
console.warn = function(){
  Array.prototype.unshift.call(arguments,colors.yellow+ now());
  Array.prototype.push.call(arguments,colors.reset);
  oldConsole.warn.apply(this,arguments)
}
console.error = function(){
  Array.prototype.unshift.call(arguments,colors.red+ now());
  Array.prototype.push.call(arguments,colors.reset);
  oldConsole.error.apply(this,arguments)
}
console.info = function(){
  Array.prototype.unshift.call(arguments,colors.cyan+ now());
  Array.prototype.push.call(arguments,colors.reset);
  oldConsole.info.apply(this,arguments)
}