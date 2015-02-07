define(function(){

  function init() {
    $('.page[data-page="live"] img').css({
      '-webkit-transition': 'all 700ms',
      'transition': 'all 700ms',
      '-webkit-transform': 'scale(1.2)',
      'transform': 'scale(1.2)'
    });
    setTimeout(function(){
      $('.page[data-page="live"] img').css({
        '-webkit-transition': 'all 400ms',
        'transition': 'all 400ms',
        '-webkit-transform': 'scale(1)',
        'transform': 'scale(1)'
      });
    }, 750);
  }

  return {
    init: init
  }
});