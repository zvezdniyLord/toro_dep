let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const navButtons = document.querySelectorAll('.nav-button');
const totalSlides = slides.length;

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
}

function updateSlider() {
  document.querySelector('.slides').style.transform = 'translateX(-' + ( window.screen.width* currentSlide) + 'px)';
  navButtons.forEach(button => button.classList.remove('active'));
  navButtons[currentSlide].classList.add('active');
}