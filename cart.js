// Получаем ссылки на элементы
const openCartBtn = document.getElementById('openCartBtn');
const cartContainer = document.getElementById('cartContainer');
const closeCartBtn = document.getElementById('closeCartBtn');

// Функция для открытия боковой корзины
function openCart() {
    cartContainer.style.right = '0'; // Показываем корзину
}

// Функция для закрытия боковой корзины
function closeCart() {
    cartContainer.style.right = '-1800px'; // Скрываем корзину
}

// Добавляем обработчик события на кнопку открытия корзины
openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
