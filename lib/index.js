const watch = require('./utils/watch')

var init = function(){

  return {
    watchCSS: watch.watchCSS(),
    watchJS: watch.watchJS()//,
    //watchTemplates: watch.watchTemplates()
  }
}

module.exports = init;
