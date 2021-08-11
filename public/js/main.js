//Mobile Menu
let humbergerButton = document.querySelector(".header-humberger");
let collapse = document.querySelectorAll(".my-collapse");

humbergerButton.addEventListener("click", function () {
  collapse.forEach((col) => {
    col.classList.toggle("collapse-toggle");
  });
});

// Gallery Carousel
$(".owl-carousel").owlCarousel({
  center: true,
  items: 2,
  loop: true,
  margin: 15,
  dots: false,
  nav: true,
  navText: [
    "<i class='fas fa-chevron-left'></i>",
    "<i class='fas fa-chevron-right'></i>",
  ],
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
});
