
// js templates
function reload(i){
  setTimeout(function(){
    location.reload(true)
  },i)
}

function dataCheck(setData){
  setData.forEach(function(i){
    if (!localStorage.getItem(i) || localStorage.getItem(i) === '') {
      $.getJSON('./app/data/' + i + '.json',function(data,status){
        if (!status === 'success'){
          console.log('unable to get ' + i +'.json')
        }
        localStorage.setItem(i,JSON.stringify(data))
        localStorage.setItem(i + 'Hash',sha3(JSON.stringify(data)))
        reload(1000)
      })
    }
  })
}


function hashCheck(setData){
  setData.forEach(function(i){
    $.getJSON('./app/data/' + i + '.json',function(data,status){
      if (!status === 'success'){
        console.log('unable to get ' + i +'.json')
      }
      var dHash = JSON.stringify(data);
      if (!localStorage.getItem(i + 'Hash') || localStorage.getItem(i + 'Hash') !== sha3(dHash)) {
        localStorage.setItem(i,dHash)
        localStorage.setItem(i + 'Hash',sha3(dHash))
        reload(1000)
      }
    })
  })
}




function getData(){
  var splash = '<div class="splash"><IMG class="displayed" src="./app/img/stylus-logo.svg" alt="Stylus" /></div>';
  var setData = ['data','templates'];
  $('body').prepend(splash);
  dataCheck(setData);
  hashCheck(setData);
  build();
}

function build(){
  var Data = JSON.parse(localStorage.getItem('data'));
  var headerTpl = Data.header;
  var sidebarTpl = Data.sidebar;
  var div = $('<div />');
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
  init()
}

function init(){
  var Tpl = JSON.parse(localStorage.getItem('templates'));
  $('#main-content').html(Tpl.home);
  initHjs('pre code')

  $('#navLink > a').click(function(event) {
    var url = $(this).attr('data-href');
    $('#main-content').html(Tpl[url]);
    pageState(url)
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

function pageState(response){
     document.title = response.pageTitle;
     window.history.pushState({"pageTitle":response.pageTitle},"", response);
 }

getData()
