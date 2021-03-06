const watch = require('./utils/watch')

var init = function(){

  return {
    watchCSS: watch.watchCSS(),
    watchJS: watch.watchJS(),
    watchData: watch.watchData(),
    watchTemplates: watch.watchTemplates()
  }
}

module.exports = init;
