document.addEventListener("DOMContentLoaded", function () {
    var prevScrollPos = window.pageYOffset;
    var navbar = document.querySelector(".navbar");
    var navbarHeight = navbar.offsetHeight;

    window.addEventListener("scroll", function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        // Scrolling up, show the navbar
        navbar.style.top = "0";
      } else {
        // Scrolling down, hide the navbar
        navbar.style.top = -navbarHeight + "px";
      }
      prevScrollPos = currentScrollPos;
    });
  });
