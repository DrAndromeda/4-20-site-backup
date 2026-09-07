console.log("head-menu loaded");
$.getJSON("http://freegeoip.net/json/", function (data) {
      var country = data.country_name;
      var ip = data.ip;
      console.log(country);
    });
    $(".nav-toggle").on("click", function(event){
      event.stopPropagation();
      console.log("head-menu loaded");
      if ($(this).hasClass('active')) {
            mobileNav.slideUp();
            $(this).removeClass('active');
        } else {
            mobileNav.slideDown();
            $(this).addClass('active');
        }
        return false;
    })