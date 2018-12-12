const fs = require('fs'),
urls = require('../urls'),
UglifyJS = require("uglify-js"),
_ = require('lodash'),
{ exec } = require('child_process');

var obj = {},
arr = [];


exports.watchCSS = function(){
  console.log('[stylus:convert]: listening.');
  fs.watch(urls.css, (eventType, filename) => {
    var src = urls.css + '/' + filename;
    var dest = urls.stylus + '/' + filename.slice(0,-3) + 'styl';
    if (filename) {
      var cmd = 'stylus --css ' + src + ' ' + dest;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log('[stylus:convert]: ' + src + ' > ' + dest);
      });

    } else {
      console.log('filename not provided');
    }
  });
}

exports.watchJS = function(){
  console.log('[JS:uglify]: listening.');
  fs.watch(urls.jsDev, (eventType, filename) => {
    var src = urls.jsDev + '/' + filename;
    var dest = urls.js + '/' + filename;
    var mini = urls.js +'/app.min.js';
    result = UglifyJS.minify(src, {
    	mangle: false,
    	compress: {
    		sequences: true,
    		dead_code: true,
    		conditionals: true,
    		booleans: true,
    		unused: true,
    		if_return: true,
    		join_vars: true,
    		drop_console: true
    	}
    });
    fs.writeFileSync(dest, result.code);
    fs.writeFileSync(mini, '');
    var files = [urls.jsDev + '/vendor/jquery.min.js', urls.jsDev + '/vendor/highlight.js', dest];
    _.forEach(files, function(i){
      var final = fs.readFileSync(i, 'utf8')
      try {
        fs.appendFileSync(mini, final);
        console.log('[JS:uglify]: ' + i + ' was appended to ' + mini);
      } catch (err) {
        if (err) throw err;
      }
    })
    console.log('[JS:uglify]: ' + mini + ' updated.');
  });
}

exports.watchTemplates = function(){

  fs.watch(urls.templates, (eventType, filename) => {

    fs.readdir(urls.templates, function(err,list){
      _.forEach(list,function(i){
        let title = i.slice(0,-4)
        fs.readFile(urls.templates + '/' + i, 'utf8', function (err,data) {
          res = JSON.parse(data)
          obj[title] = res[title]
        });
      })
      console.log(JSON.stringify(obj))
    })


  });
}
