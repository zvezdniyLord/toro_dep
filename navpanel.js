// Получаем все элементы навигационной панели
var navItems = document.querySelectorAll('.category__link');
// Получаем все секции
var sections = document.querySelectorAll('.section__list');

// Добавляем обработчик события прокрутки
window.addEventListener('scroll', function () {
    // Перебираем все секции
    sections.forEach(function (section, index) {
        // Получаем позицию верхней и нижней границы секции
        var top = section.offsetTop - 100; // 100 - смещение для более плавного перехода
        var bottom = top + section.offsetHeight;

        // Если текущая прокрутка находится в пределах секции
        if (window.scrollY >= top && window.scrollY < bottom) {
            // Убираем класс активности со всех элементов навигации
            navItems.forEach(function (item) {
                item.classList.remove('active');
            });
            // Добавляем класс активности только соответствующему элементу навигации
            navItems[index].classList.add('active');
        }
    });
});