var menu = document.querySelector(".active");
var hidden = document.querySelector(".flex__left");
// var hidden2 = document.querySelector(".flex__middle");
var work__time = document.querySelector(".work__time");
work__time.style.display = "block";
menu.style.display = "none";
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    work__time.style.display = "none";
    hidden.style.display = "none";
    // hidden2.style.display = "none";
    menu.style.display = "block";
  } else {
    work__time.style.display = "block";
    hidden.style.display = "block";
    menu.style.display = "none";
    // hidden2.style.display = "block";
  }
});

