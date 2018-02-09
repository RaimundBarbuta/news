$.ajax('https://newsapi.org/v2/sources?apiKey=585d102065a64d25931369240c75f14f', {
  //crossDomain:true,
  method:'get',
  success: function(apidata){
    // creates cards in div if api call is successful:
    createCards(apidata, function(){
    });
  }
});

// eventlistener onclick to see if <a> tag has class of .source and NOT id of #closed
    $('body').on('click', 'a.source:not(#close)', function(){
//condition to only create a title card if <a> doesnt have class of .selected
    if($(this).parent('div').hasClass('selected') == false){
// gives var source the value of card data source value
      var source = $(this).attr("data-source");
      openMenu();
      $.ajax('https://newsapi.org/v2/top-headlines?sources='+ source +'&apiKey=585d102065a64d25931369240c75f14f', {
       crossDomain:true,
       method: 'get',
       success: function(data) {
         getTitles(data);
       }
      });
    }else{

      selectCard(this);
    }
    });
/* eventlistener that applies function closeMenu to
<span class="close_popup"><a id="close"><i class="fa fa-times fa-4x" aria-hidden="true"></i></a></span> */

$('.close_popup').click(function(){
  closeMenu();
});
//function to create a Card for each Media outlet available in the news API.
function createCards(apidata, callback) {
    for( var i = 0; i < apidata.sources.length; i++){
      var div = $("<div class='card col-xs-4 col-sm-1'>" + "</br>" +
        "<a class='about source'" +
        " data-source='"+ apidata.sources[i].id +
        "' href='#content'>" +
        "<img src='" + "https://besticon-demo.herokuapp.com/icon?url=" +
        apidata.sources[i].url + "&size=60..120..500' style='width:100%' </a>"+"</br>"+"</div>");
    $(div).appendTo('#all');
    callback();
  }
}
//function to get the top news titles.
function getTitles(data, clear = true){
// this clears the popup
  if (clear) {
    $('#title').text('');
  }
  //creats <a> and appends titles and urls to the popup
  for (var i = 0; i < data.articles.length; i++) {
    $('<a target="_blank" href="' + data.articles[i].url + '"></br>' + data.articles[i].title + '</a></br>').appendTo('#title');
  }
}
//function to give a class of open to the containing div so CSS styling can be applied
function openMenu() {
  var content = document.getElementById('content');
  content.classList.add('open');
}
//function to remove the class so CSS styleing can be removed
function closeMenu() {
  $('#title').text('');
  var content = document.getElementById('content');
  content.classList.remove('open');
}
//animation script for wobble title...
$(document).ready(function() {
    $('.dynpost').addClass("bt_hidden").viewportChecker({
      classToAdd: 'bt_visible animated bounce',
      offset: 100,
      repeat: true,
      callbackFunction: function(elem, action){},
      scrollHorizontal: false
    });
});
//function to make sources opaque when asshole button is clicked
function selectNews(event){
  $('.card').css('opacity', '0.2');
  $('.card').addClass('selected');
  $('.card').addClass('iconwobble');
  $('#assholeBtn').html('<h3>Select favourite news sources!</h3>');
  if($('#done').length == 0){
    $('<button id="done"> <h3><a id="tothetop" href="#top"> Back to top! </a></h3></button>').appendTo('#toptoppin');
    $('<button id="done" class="animated wobble source" onclick="selectNews(event)">  <h3 onclick="openMenu()"> Done!</h3> </button>').insertAfter('#assholeBtn');
  }

}
function selectCard(ele){
  $(ele).parent().css('opacity', '1');
  $(ele).parent().removeClass('iconwobble');
  console.log($(ele).attr('data-source'));
  getSourceTitles($(ele).attr('data-source'));
}

function getSourceTitles(source) {
  // Do ajax request to find source top stories
  $.ajax('https://newsapi.org/v2/top-headlines?sources='+ source +'&apiKey=585d102065a64d25931369240c75f14f', {
   crossDomain:true,
   method: 'get',
   success: function(data) {
     getTitles(data, false);
   }
  });

}
