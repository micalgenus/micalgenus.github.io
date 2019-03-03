$(document).ready(function() {
  window.onresize = () => {
    onScroll(document.getElementById("post-listing").scrollTop, document.getElementById("post-listing").scrollHeight);
  };

  window.onscroll = () => {
    onScroll(
      document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset,
      document.getElementById("post-listing").scrollHeight + sticky
    );
  };

  document.getElementById("post-listing").onscroll = () => {
    onScroll(document.getElementById("post-listing").scrollTop, document.getElementById("post-listing").scrollHeight);
  };

  var header = document.getElementById("progress-container");
  // var sticky = header.offsetTop;
  var sticky = 400;

  function onScroll(scroll, heigth) {
    // var winScroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    var winScroll = scroll;
    // var windowHeight = document.getElementById("post-listing").scrollHeight + sticky;
    var windowHeight = heigth;
    var height = windowHeight - document.documentElement.clientHeight;

    var scrolled = (winScroll / height) * 100;
    document.getElementById("page-status").style.width = scrolled + "%";

    if (winScroll > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    $("#scroll-button")
      .removeClass("scroll-position-top")
      .removeClass("scroll-position-bottom");

    if (scrolled < 5) $("#scroll-button").addClass("scroll-position-top");
    else if (scrolled > 95) $("#scroll-button").addClass("scroll-position-bottom");
  }

  $("#to-top").click(() => {
    $(".post-listing").animate({ scrollTop: 0 }, "slow");
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $("#to-bottom").click(() => {
    $(".post-listing").animate({ scrollTop: document.getElementById("post-listing").scrollHeight + sticky }, "slow");
    $("html, body").animate({ scrollTop: document.getElementById("post-listing").scrollHeight + sticky }, "slow");
  });
});
