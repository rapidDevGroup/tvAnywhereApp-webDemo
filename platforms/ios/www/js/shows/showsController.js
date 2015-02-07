define(['shows/showsView'], function(showsView){

  function init(page) {
    showsView.render(page);
  }

  return {
    init: init
  }
});