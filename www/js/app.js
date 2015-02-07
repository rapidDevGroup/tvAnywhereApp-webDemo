require.config({
    paths: {
        handlebars: "../lib/handlebars/handlebars",
        text: "../lib/text/text",
        hbs: "../lib/requirejs-hbs/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});

define('app', ['config', 'handlebars', 'utils/router', 'utils/keyboard'], function(config, handlebars, router, keyboard) {

    router.init();

    var f7 = new Framework7({
      fastClicksDistanceThreshold: 20,
      swipeBackPage: false
    });
    var mainView = f7.addView('.view-main', {
      dynamicNavbar: true
    });
    f7.allowPanelOpen = false;
    f7.mainView.hideNavbar();

    mainView.router.load({url: 'features.html'});

    document.addEventListener('deviceready', function() {
        keyboard.init();

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        StatusBar.styleDefault();

        if(navigator.splashscreen) {
            setTimeout(function() {
                navigator.splashscreen.hide();
            }, config.splashScreen.delay);
        }

    }, false);

    return {
        f7: f7,
        mainView: mainView
    };
});