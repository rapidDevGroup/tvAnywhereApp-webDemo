define(['app', 'hbs!tv/tv'], function(app, template){

  function render() {
    app.f7.showIndicator();
    var tvList = $('#tvList');
    tvList.html(template({}));

    setTimeout(function() {
      imagesLoaded('#tvList img', function () {
        tvList.isotope({
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: 320
          }
        });
        tvList.isotope('on', 'layoutComplete', function () {
          tvList.parent('.page-content').animate({
            scrollTop: 0
          }, 500);
        });
        tvList.on('click', '.item', function () {
          app.mainView.router.load({url: 'shows.html'});
        });
        tvList.css('opacity', 1);
        app.f7.hideIndicator();
      });
    }, 500);

    $('.network-select').click(function(e){
      var network = $(e.target).text();
      if (network === 'All') network = '*';
      else network = '.' + network.replace(/ /g,"-");
      tvList.isotope({ filter: network });
    });
  }

  return {
    render: render
  }
});