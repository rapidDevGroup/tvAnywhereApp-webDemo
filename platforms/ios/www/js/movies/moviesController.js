define(['movies/moviesView'], function(mainView){

  function init(page) {
    mainView.render(page);
  }

  return {
    init: init
  }
});