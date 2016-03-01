// Init sidebar
$(function() {
  var activeItem,
      helpList = $('#js-sidebar .js-topic'),
      firstOccurance = true,
      styleTOC = function() {
        var pathRegEx = /\/\/[^\/]+([A-Za-z0-9-_./]+)/g,
            docUrl = pathRegEx.exec(window.location.toString())
        if (docUrl){
          $('#js-sidebar .js-topic a').each(function(){
            if ($(this).parent('li').hasClass('disable'))
              $(this).parent('li').removeClass('disable')

            var url = $(this).attr('href').toString()
            var cleanDocUrl = docUrl[1]
            if(url.indexOf(cleanDocUrl) >= 0 && url.length == cleanDocUrl.length){
              $(this).parent('li').addClass('disable')
              var parentTopic = $(this).parentsUntil('div.sidebar-module > ul').last()
              parentTopic.addClass('js-current')
              parentTopic.find('.js-expand-btn').toggleClass('collapsed expanded')
            }
          });
        }
      }



  $('#js-sidebar .js-topic').each(function(){
    if(($(this).find('.disable').length == 0 || firstOccurance == false) &&
    $(this).hasClass('js-current') != true){
      $(this).find('.js-guides').children().hide()
    } else {
      activeItem = $(this).index()
      firstOccurance = false
    }
  })

  // Toggle style list. Expanded items stay
  // expanded when new items are clicked.
  $('#js-sidebar .js-toggle-list .js-expand-btn').click(function(){
    var clickedTopic = $(this).parents('.js-topic'),
        topicGuides  = clickedTopic.find('.js-guides li')
    $(this).toggleClass('collapsed expanded')
    topicGuides.slideToggle(100)
    return false
  })

  // Accordion style list. Expanded items
  // collapse when new items are clicked.
  $('#js-sidebar .js-accordion-list .js-topic h3 a').click(function(){
    var clickedTopic = $(this).parents('.js-topic'),
        topicGuides = clickedTopic.find('.js-guides li')

    if(activeItem != clickedTopic.index()){
      if(helpList.eq(activeItem)){
        helpList.eq(activeItem).find('.js-guides li').slideToggle(100)
      }
      activeItem = clickedTopic.index()
      topicGuides.slideToggle(100)
    } else {
      activeItem = undefined
      topicGuides.slideToggle(100)
    }

    return false
  })


  if (groupSelection && groupSelection !== undefined) {
      $('#' + groupSelection + '-menu .js-expand-btn').toggleClass('collapsed expanded');
      $('#' + groupSelection + '-menu .js-guides li').slideToggle(100);

      // using hash
    var hash = document.location.hash;
    if (hash) {
        $('#' + groupSelection + '-' + hash.replace('#', '') + '-menu').addClass('disable');
    }
    // using path
    if (itemSelection && itemSelection !== undefined) {
        $('#' + groupSelection + '-' + itemSelection + '-menu').addClass('disable');
    }
  }


  $('#js-sidebar .js-guides li a[href*=#]').bind("click", function(e) {
     $('#js-sidebar .js-guides li').removeClass( 'disable' );
     $(e.target).parent().addClass('disable')
  });



});


 /*
    Highlight code for plain theme of waypointer
 */

addEventListener('load', function() {
    var nodeList = document.querySelectorAll('pre code.json');
    for (var i = 0; i < nodeList.length; ++i) {
        hljs.highlightBlock(nodeList[i]);
    }

    var stickyElements = document.getElementsByClassName('sticky');
    for (var i = stickyElements.length - 1; i >= 0; i--) {
        Stickyfill.add(stickyElements[i]);
    }
});