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

define('app', ['config', 'handlebars', 'utils/router', 'utils/keyboard'], function(config, handlebars, router) {

    router.init();

    var f7 = new Framework7({
      fastClicksDistanceThreshold: 20,
      swipeBackPage: false
    });
    var mainView = f7.addView('.view-main', {
      dynamicNavbar: true
    });

    mainView.router.load({url: 'search.html'});

    $('html').addClass('with-statusbar-overlay');

    return {
        f7: f7,
        mainView: mainView
    };
});