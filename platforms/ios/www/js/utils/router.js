define(function() {

  var $ = Framework7.$;
  var currentPageObj;
  var lastController;

  function init() {
    $(document).on('pageInit', function (e) {
      var page = e.detail.page;
      load(page.name, page);
    });
  }

  function load(controllerName, page) {
    if (lastController && lastController.destroy) lastController.destroy();
    require([controllerName + '/'+ controllerName + 'Controller'], function(controller) {
      setCurrentPageObj(page);
      controller.init(page);
      lastController = controller;
    });
    onPageChange();
  }

  function onPageChange() {
    if (window.cordova && window.cordova.plugins.Keyboard && cordova.plugins.Keyboard.isVisible) cordova.plugins.Keyboard.close();
  }

  function setCurrentPageObj(page) {
    currentPageObj = page;
  }

  function getCurrentPageObj() {
    return currentPageObj;
  }

  return {
    init: init,
    setCurrentPageObj: setCurrentPageObj,
    getCurrentPageObj: getCurrentPageObj
  };
});