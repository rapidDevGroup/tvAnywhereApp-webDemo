define(['app'], function(app){

  function init() {
  }

  function destroy() {
    app.f7.allowPanelOpen = true;
    app.f7.mainView.showNavbar();
  }

  return {
    init: init,
    destroy: destroy
  }
});