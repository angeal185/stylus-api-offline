
// js templates
var headerTpl = '<header class="logo"><p class="imc"><img src="./app/img/stylus-logo.svg" alt="Stylus" /></p></header>';
var sidebarTpl = '<div class="sidebarWrap"><div class="sidebar"><nav id="navLink"></nav></div><div class="sbToggle"><img src="./app/img/gear.svg"></div></div>';
var splash = '<div class="splash"><IMG class="displayed" src="./app/img/stylus-logo.svg" alt="Stylus" /></div>'
var div = $('<div />');

$('body').prepend(splash)

function reload(i){
  setTimeout(function(){
    location.reload(true)
  },i)
}

function getData(){
  var setData = ['data','templates'];
  setData.forEach(function(i){
    if (!localStorage.getItem(i) || localStorage.getItem(i) === '') {
      $.getJSON('./app/data/' + i + '.json',function(data,status){
        if (!status === 'success'){
          console.log('unable to get ' + i +'.json')
        }

        localStorage.setItem(i,JSON.stringify(data))
        reload(1000)
      })
    }
  })
}



var Data = JSON.parse(localStorage.getItem('data'));
var Tpl = JSON.parse(localStorage.getItem('templates'));


function build(){
  //build body
  $('.splash').after(
    div.clone().addClass('wrap').prepend(
        sidebarTpl,
        $('<main />').addClass('main-content').prepend(
            headerTpl,
            div.clone().attr('id','main-content')
          )
      )
  )


  //build nav
  $(Data.nav).each(function(index, el) {
    $('#navLink').append(
      '<a data-href="'+ el.url +'">' + el.title + '</li>'
    )
  });

}


function toggleCss(){

    if($(this).css('left','0')){
      $(this).css('left','300')
    } else {
      $(this).css('left','300')
    }
}

function init(){
  $('#main-content').html(Tpl.home);
  initHjs('pre code')

  $('#navLink > a').click(function(event) {
    var url = $(this).attr('data-href')
    $('#main-content').html(Tpl[url]);
    $('.sidebar').animate({
      left: "toggle"
    },0);
    $('.sbToggleShow, .sbToggle').toggleClass('sbToggleShow sbToggle')
    initHjs('pre code')
  });

  $('.sbToggle').click(function() {
    $('.sidebar').animate({
      left: 'toggle'
    },0);
    $(this).toggleClass('sbToggleShow sbToggle')
  });
}

function initHjs(ele){
  $(ele).each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

getData()
build();
init();
