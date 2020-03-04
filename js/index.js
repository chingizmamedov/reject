(function($) {
  $("#menu-toggle").click(function() {
    if ($("#sidebar").hasClass("sidebar-active")) {
      $("#sidebar").removeClass("sidebar-active");
    } else {
      $("#sidebar").addClass("sidebar-active");
    }
  });

  new SlimSelect({
    select: "#Branch",
    beforeOnChange: info => {
      console.log(info);
      // this will stop propagation
    },
    onChange: info => {
      console.log(info);
    }
  });
  new SlimSelect({
    select: "#Service",
    beforeOnChange: info => {
      console.log(info);
      // this will stop propagation
    },
    onChange: info => {
      console.log(info);
    }
  });
  new SlimSelect({
    select: "#User",
    beforeOnChange: info => {
      console.log(info);
      // this will stop propagation
    },
    onChange: info => {
      console.log(info);
    }
  });
  new SlimSelect({
    select: "#Product",
    beforeOnChange: info => {
      console.log(info);
      // this will stop propagation
    },
    onChange: info => {
      console.log(info);
    }
  });
  new SlimSelect({
    select: "#Category",
    beforeOnChange: info => {
      console.log(info);
      // this will stop propagation
    },
    onChange: info => {
      console.log(info);
    }
  });

  let searchInput = "";

  $("#search").on("input", function(event) {
    searchInput = event.target.value;
    const inputLength = searchInput.length;
    console.log("inputLength", inputLength);
    if (inputLength > 2) {
      $(".search-custom-btn").addClass("search-custom-btn__active");
    } else {
      $(".search-custom-btn").removeClass("search-custom-btn__active");
    }
  });
})(jQuery);
