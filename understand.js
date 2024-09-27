const closeModalBtn = document.querySelector(".understand");
const section = document.querySelector(".popup");
closeModalBtn.addEventListener("click", () => {
  section.style.display = "none";
});
// Функция для закрытия модального окна
function closeModal() {
  section.style.display = "none"; // Скрываем затемненный задний экран и модальное окно
}
closeModalBtn.addEventListener("click", closeModal);

// Временной обработчик

const currentTime = new Date().getHours();
const closeTime = document.querySelector(".ok");
const warning = document.querySelector(".warning");
// Функция для закрытия модального окна
function closeModal() {
  warning.style.display = "none"; // Скрываем затемненный задний экран и модальное окно
}
closeTime.addEventListener("click", closeModal);
// Проверяем, что текущее время находится в диапазоне от 11 до 22 часов
if (currentTime >= 11 && currentTime <= 22) {
  // console.log('allisgood')
} else {
  warning.style.display = "block"; // Скрываем затемненный задний экран и модальное окно
}
