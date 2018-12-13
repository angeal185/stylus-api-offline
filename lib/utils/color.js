//color console
function col(i){
  if (i == 'r'){
    //red
    return '31';
  }
  else if (i === 'g'){
    //green
    return '32';
  }
  else if (i === 'c'){
    //cyan
    return '36';
  }
  else if (i === 'm'){
    //magenta
    return '35';
  }
  else if (i === 'b'){
    //blue
    return '34';
  }
  else {
    console.error('color choice eror!')
  }
}

exports.logInit = function(a,b,c,d){
  console.log('\x1b[' + col(a) + 'm%s\x1b[0m' + '\x1b[' + col(b) + 'm%s\x1b[0m', '[' + c + ']: ', d);
}
