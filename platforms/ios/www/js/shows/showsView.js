define(['app', 'hbs!shows/shows'], function(app, template){

  function render() {

    setTimeout(function() {
      var showsDetail = $('#shows');
      showsDetail.html(template({}));
      var play = $('#shows .play');
      var topHalf = $('#shows .top-half');
      var bottomHalf = $('#shows .bottom-half');
      var poster = $('#shows .poster');

      var expanded = false;
      showsDetail.on('touchstart', function() {
        if (!expanded) {
          topHalf.css('-webkit-transform', 'translate3d(0,-100px,0)');
          bottomHalf.css('-webkit-transform', 'translate3d(0,10%,0)');
          poster.css('-webkit-transform', 'translate3d(0,-300px,0)');
          topHalf.css('transform', 'translate3d(0,-100px,0)');
          bottomHalf.css('transform', 'translate3d(0,10%,0)');
          poster.css('transform', 'translate3d(0,-300px,0)');
          play.css('opacity', '1');
        } else {
          topHalf.css('-webkit-transform', 'translate3d(0,0,0)');
          bottomHalf.css('-webkit-transform', 'translate3d(0,60%,0)');
          poster.css('-webkit-transform', 'translate3d(0,0,0)');
          topHalf.css('transform', 'translate3d(0,0,0)');
          bottomHalf.css('transform', 'translate3d(0,60%,0)');
          poster.css('transform', 'translate3d(0,0,0)');
          play.css('opacity', '0');
        }
        expanded = !expanded;
        return false;
      });

      play.on('touchstart', function() {
        app.f7.loginScreen();
        return false;
      })
    }, 250);
  }

  return {
    render: render
  }
});