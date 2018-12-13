const fs = require('fs'),
urls = require('../urls'),
UglifyJS = require("uglify-js"),
_ = require('lodash'),
col = require('./color'),
{ exec } = require('child_process');

let obj = {},
arr = [];

exports.watchCSS = function(){
  col.logInit('g', 'm', 'watch:css', ' listening...')
  //console.log('[watch:css]: listening.');
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
  col.logInit('g', 'm', 'watch:js', ' listening...')
  fs.watch(urls.jsDev, function(eventType, filename) {
    var code = fs.readFileSync(urls.jsDev + '/' + filename, "utf8");
    var src = urls.jsDev + '/' + filename;
    var dest = urls.js + '/' + filename;
    var mini = urls.js +'/app.min.js';
    console.log(code)
    result = UglifyJS.minify(code, {
    	mangle: false,
    	compress: {
    		sequences: true,
    		dead_code: true,
    		conditionals: true,
    		booleans: true,
    		unused: true,
    		if_return: true,
    		join_vars: true,
    		drop_console: false
    	}
    });

    console.log(result.error)

    fs.writeFileSync(dest, result.code);
    fs.writeFileSync(mini, '');
    var files = [
      urls.jsDev + '/vendor/jquery.min.js',
      urls.jsDev + '/vendor/sha3.js',
      urls.jsDev + '/vendor/highlight.js', dest
    ];

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
  col.logInit('g', 'm', 'watch:templates', ' listening...');
  fs.watch(urls.templates, (eventType, filename) => {

    fs.readdir(urls.templates, function(err,list){
      _.forEach(list,function(i){
        let title = i.slice(0,-4)
        fs.readFile(urls.templates + '/' + i, 'utf8', function (err,data) {
          res = JSON.parse(data)
          _.merge(obj, res)
        });
      })
      setTimeout(function(){
        var final = JSON.stringify(obj)
        //console.log(JSON.stringify(obj))
        fs.writeFile(urls.data + '/templates.json', final, function (err) {
          if (err) throw err
        });
      },10000)
    })
  });
}

exports.watchData = function(){
  col.logInit('g', 'm', 'watch:data', ' listening...');
  fs.watch(urls.dataDev, (eventType, filename) => {
    fs.readFile(urls.dataDev + '/' + filename, 'utf8', function(err,data){
      if (err) throw err
      result = JSON.stringify(JSON.parse(data));
      fs.writeFile(urls.data + '/' + filename, result, function (err) {
        if (err) throw err
      });
    })
  });
}

function minJs(src,dest){

  var code = fs.readFileSync(src, "utf8");

  result = UglifyJS.minify(code, {
    mangle: false,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      drop_console: false
    }
  });

  console.log(result.error)

  fs.writeFileSync(dest, result.code);
}

//minJs(urls.jsDev + '/vendor/sha3.js',urls.jsDev + '/vendor/sha3.min.js')
