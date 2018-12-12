const fs = require('fs'),
_ = require('lodash'),
config = require('../config');
let files
obj = {};

exports.extractTpl function(){
	fs.readFile('./app/data/templates.json', 'utf8', function (err,data) {
		let file = JSON.parse(data);
		 _.forIn(file,function(i,e){
			 let choice = _.pick(file,[e])
			 result = JSON.stringify(choice)
			 console.log(result)
			 fs.writeFile('./dev/templates/' + e + '.json', result, function () {
				 if (err) throw err
				 //console.log(e)
			 });
		 })
	})
}

exports.createTpl function(){
  let files = config.templates;
  files.forEach(function(i){
    fs.readFile(urls.docs + '/' + i + '.html', 'utf8', function (err,data) {
      if (err) throw err
      var result = data;
      console.log(result)
      obj[i] = result;
    });
  })
  setTimeout(function(){
    fs.writeFile('./templates.json', JSON.stringify(obj), function (err) {
      if (err) throw err
    });
  },10000)
}
