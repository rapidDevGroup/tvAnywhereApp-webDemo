define(['tv/tvView'], function(tvView){

  function init(page) {
    tvView.render(page);
  }

  return {
    init: init,
    reInit: init
  }
});