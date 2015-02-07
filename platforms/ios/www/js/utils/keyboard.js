define(["config", "utils/router"], function(config, router) {

  var $ = Framework7.$;
  var page, pageContent, messageBar, searchBar, inputs, initialPadding, preventAction, aE;
  var keyboardOpenTimeout, keyboardCloseTimeout, keyboardOpen = false;

  // guess initial height until keyboard is opened -- TODO: estimate better height by device OS and version
  var keyboardHeight = (window.cordova && window.cordova.plugins.Keyboard ? $(document).outerHeight()/2 : 0);

  function init() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      $(window).on('native.keyboardshow', keyboardShowHandler);
      $(window).on('native.keyboardhide', keyboardHideHandler);

      $(document).on('focusin', 'input', browserFocusHandler);
    }
  }

  function browserFocusHandler(e) {
    if( !e.target || e.target.readOnly) return;
    aE = e.target;
    return false;
  }

  function reFocus() {
    messageBar.find('.messaging').focus();
    preventAction = true;
    return false;
  }

  function closeKeyboard() {
    preventAction = false;
  }

  function keyboardShowHandler(e) {
    clearTimeout(keyboardCloseTimeout);
    clearTimeout(keyboardOpenTimeout);

    var page = router.getCurrentPageObj();
    pageContent = $(page.container).find('.page-content');
    if (!keyboardOpen) initialPadding = parseInt(pageContent.css('padding-bottom'), 10);
    messageBar = $(page.container).find('.messagebar');
    searchBar = $(page.container).find('.searchbar');
    inputs = $(page.container).find('input, textarea, select');

    keyboardOpenTimeout = setTimeout(function() {
      if (keyboardOpenTimeout) clearTimeout(keyboardOpenTimeout);
      if (searchBar.length !== 0) return;
      if (messageBar.length === 0 && inputs.length === 0) return;

      if (messageBar.length !== 0 && !preventAction) {
        messageBar.attr('data-keyboard-height', e.keyboardHeight);
        pageContent.css('padding-bottom', e.keyboardHeight + initialPadding + 'px');

        setTimeout(function () {
          messageBar.css('bottom', e.keyboardHeight + 'px');
          pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight, config.keyboard.scrollSpeedChats);
        }, config.keyboard.keyboardDelay);

        var sendLink = messageBar.find('.send-link');
        var textArea = messageBar.find('.messaging');
        sendLink.on('click', reFocus);
        textArea.on('blur', closeKeyboard);
      } else if (inputs.length !== 0 && !keyboardOpen) {
        preventAction = true;
        pageContent.css('padding-bottom', e.keyboardHeight + initialPadding + 'px');

        setTimeout(function() {
          var eBounds = aE.getBoundingClientRect();
          var diff = screen.height - keyboardHeight - config.keyboard.extraPadding;

          if (diff < eBounds.bottom){
            pageContent.scrollTop(keyboardHeight + config.keyboard.extraPadding, config.keyboard.scrollSpeedInputs);
          }
        }, config.keyboard.keyboardDelay);

        setTimeout(function() {
          aE.blur();
          aE.focus();
        }, config.keyboard.keyboardDelay + config.keyboard.scrollSpeedInputs + 50)
      }
      keyboardOpen = true;
      keyboardHeight = e.keyboardHeight;
    }, 5);
  }

  function keyboardHideHandler() {
    clearTimeout(keyboardCloseTimeout);
    clearTimeout(keyboardOpenTimeout);

    keyboardCloseTimeout = setTimeout(function(){
      if (searchBar.length !== 0) return;
      if (messageBar.length === 0 && inputs.length === 0) return;

      if (messageBar.length !== 0 && !preventAction) {
        messageBar.css('bottom', '0');
        messageBar.attr('data-keyboard-height', 0);
        pageContent.css('padding-bottom', initialPadding + 'px');

        keyboardCloseTimeout = setTimeout(function () {
          pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight, config.keyboard.scrollSpeedChats);
        }, config.keyboard.keyboardDelay);

        var sendLink = messageBar.find('.send-link');
        var textArea = messageBar.find('.messaging');
        sendLink.off('click', reFocus);
        textArea.off('blur', closeKeyboard);
      } else if (inputs.length !== 0) {
        preventAction = false;
        pageContent.css('padding-bottom', initialPadding + 'px');
      }

      keyboardOpen = false;
    }, 5);
  }

  return {
    init: init
  }
});