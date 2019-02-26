$(document).ready(function() {
  window.onscroll = () => {
    onScroll();
  };

  var header = document.getElementById("progress-container");
  // var sticky = header.offsetTop;
  var sticky = 400;

  function onScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    var windowHeight = document.getElementById("post-listing").scrollHeight + sticky;
    var height = windowHeight - document.documentElement.clientHeight;

    var scrolled = (winScroll / height) * 100;
    document.getElementById("page-status").style.width = scrolled + "%";

    if (winScroll > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
});
