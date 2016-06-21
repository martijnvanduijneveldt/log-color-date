/*!
 * log-color-date
 * Copyright(c) 2016 Martijn van Duijneveldt
 * MIT Licensed
 */

'use strict'

//text colors
var colors = {
    reset: '\u001b[0m',
    red: "\u001b[1;31m",
    yellow: '\u001b[1;33m',
    cyan: '\u001b[1;36m'
}

var oldConsole = {};
oldConsole.log = console.log;
oldConsole.error = console.error;
oldConsole.warn = console.warn;
oldConsole.info = console.info;

var now = function(){
  return "["+ new Date().toLocaleString()+"]";
}

var formatArgs = function(args,color){
  if(color){
    if(typeof args[0] === "string" && args[0].indexOf('%') != -1){
      args[0] = color+now()+" "+args[0];
    }else{
      Array.prototype.unshift.call(args, color+now());
    }
    Array.prototype.push.call(args,colors.reset);
  }else{
    if(typeof args[0] === "string" && args[0].indexOf('%') != -1){
      args[0] = now()+" "+args[0];
    }else{
      Array.prototype.unshift.call(args, now());
    }
  }
}

console.log = function(){
  formatArgs(arguments);
  oldConsole.log.apply(this,arguments)
}
console.warn = function(){
  formatArgs(arguments,colors.yellow);
  oldConsole.log.apply(this,arguments)
}
console.error = function(){
  formatArgs(arguments,colors.red);
  oldConsole.log.apply(this,arguments)
}
console.info = function(){
  formatArgs(arguments,colors.cyan);
  oldConsole.log.apply(this,arguments)
}
