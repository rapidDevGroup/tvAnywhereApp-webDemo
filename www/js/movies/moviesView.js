define(['app', 'hbs!movies/movies'], function(app, template){

  function render() {
    app.f7.showIndicator();
    var movieList = $('#movieList');
    movieList.html(template({}));

    setTimeout(function() {
      movieList.imagesLoaded(function () {
        movieList.isotope({
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: 320
          }
        });
        movieList.isotope('on', 'layoutComplete', function () {
          movieList.parent('.page-content').animate({
            scrollTop: 0
          }, 500);
        });
        movieList.on('click', '.item', function () {
          app.mainView.router.load({url: 'shows.html'});
        });
        movieList.css('opacity', 1);
        app.f7.hideIndicator();
      });
    },500);

    $('.genres-select').click(function(e){
      var genre = $(e.target).text();
      if (genre === 'All') genre = '*';
      else genre = '.' + genre;
      movieList.isotope({ filter: genre });
    });
  }

  return {
    render: render
  }
});