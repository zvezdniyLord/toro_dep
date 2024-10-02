let cartItems = [];
const products = [];
let orderArr = [];
const inputData = document.querySelector(".input-data");
var closeSearch = document.querySelector(".close__search");
const data = new FormData(document.querySelector("form"));
const inputPrice = document.querySelector(".input-price");
const inputName = document.querySelector(".input-name");
const inputOrder = document.querySelector(".input-order");
const inputAddress = document.querySelector('.input-address');
const shoppingBlock = document.querySelector('.shopping_cart');
const closeShopping = document.querySelector(".close-btn");
var summory = document.querySelector('.summory')
var summo = document.querySelector('.summo');


function toggleCheckbox(otherCheckboxId, currentCheckbox) {
  const otherCheckbox = document.getElementById(otherCheckboxId);
  if (currentCheckbox.checked) {
    otherCheckbox.disabled = true;
    inputAddress.setAttribute('required', 'true');
  } else {
    inputAddress.setAttribute('required', false);
    otherCheckbox.disabled = false;
  }
}

elementGetNone(closeShopping, shoppingBlock);

// documents
document.querySelectorAll(".add__to__cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productElement = event.target.closest(".cat1__product");
    const productId = productElement.getAttribute("data-product-id");
    const productName = productElement
      .querySelector(".desc__name")
      .textContent.trim();
    const productPrice = productElement
      .querySelector(".cost__with__weight")
      .textContent.split(" ")[0]
      .trim();
    const productImage = productElement
      .querySelector(".product__image")
      .getAttribute("src");
    const productQuantity = productElement.querySelector(".itog").textContent;
    addToCart(
      productId,
      productName,
      productPrice,
      productImage,
      productQuantity
    );
    orderAdd(productId, productName, productPrice, productQuantity);
  });
});
document.querySelectorAll(".plus").forEach((button) => {
  button.addEventListener("click", increase);
});

document.querySelectorAll(".minus").forEach((button) => {
  button.addEventListener("click", decrease);
});

document.querySelector(".get__offer").addEventListener("click", () => {
  document.querySelector(".shopping_cart").style.display = "flex";
  document.querySelector(".shopping_cart").style.flexDirection = "column";
  document.querySelector('.cart__container').style.width = '1200px';
});

document.querySelector(".promo-code-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const promoCode = document.querySelector(".promo-code-input").value.trim();
  applyPromoCode(promoCode);
});

document.querySelectorAll(".cat1__product").forEach((product) => {
  const id = product.getAttribute("data-product-id");
  const name = product.querySelector(".desc__name").innerText.trim();
  const description = product
    .querySelector(".desc__text")
    .innerText.trim()
    .split("\n")[0];
  const priceText = product
    .querySelector(".cost__with__weight")
    .innerText.trim();
  const price = parseInt(priceText.replace(/\D/g, ""), 10); // Extract numeric value from price text
  const image = product.querySelector(".product__image").getAttribute("src"); // Extract image source

  products.push({ id: parseInt(id, 10), name, description, price, image });
});
closeSearch.addEventListener("click", () => {
  const input = (document.getElementById("searchInput").value = "");
  const resultsContainer = document.getElementById("searchResultsContainer");
  const resultsList = document.getElementById("searchResults");
  resultsList.innerHTML = "";
  resultsContainer.style.display = "none";
  closeSearch.style.display = "none";
});

// functions
function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  displayCartItems(); // Обновляем HTML-элементы на странице после удаления

  // Удаляем продукт из массива orderArr
  orderArr = orderArr.filter((item) => item.id !== productId);

  // Пересчитываем итоговую сумму заказа
  const totalIndex = orderArr.findIndex((item) => item.id === "total");
  if (totalIndex !== -1) {
    const totalSum = orderArr.reduce((total, item) => total + item.summ, 0);
    orderArr[totalIndex].price = totalSum; // Обновляем итоговую сумму заказа
    orderArr[totalIndex].summ -= totalSum; // Обновляем итоговую сумму заказа
    dataToInput(orderArr, inputData); // Обновляем input-элемент на странице
  }
}

function addToCart(
  productId,
  productName,
  productPrice,
  productImage,
  productQuantity
) {
  cartItems.push({
    id: productId,
    name: productName,
    price: productPrice,
    quantity: parseInt(productQuantity, 10),
    image: productImage,
  });
  displayCartItems();
}

function displayCartItems() {
  let marginTopValue = 0;
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = ""; // Clear container before adding new items
  cartContainer.style.height = `${cartContainer.scrollHeight}px`
  cartItems.forEach((item) => {

    const listItem = document.createElement("li");
    listItem.classList.add("cart__list");

    // Create and append the image element
    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.classList.add("cartImg");
    listItem.appendChild(imageElement);

    const inputCount = document.createElement("input");
    inputCount.setAttribute("type", "hidden");
    inputCount.setAttribute("name", "name");
    inputCount.setAttribute("value", `${item.quantity}`);
    listItem.appendChild(inputCount);

    const inputPrice = document.createElement("input");
    inputPrice.setAttribute("type", "hidden");
    inputPrice.setAttribute("name", "price");
    inputPrice.setAttribute("value", `${item.price}`);
    listItem.appendChild(inputPrice);

    const inputName = document.createElement("input");
    inputName.setAttribute("type", "hidden");
    inputName.setAttribute("name", "order");
    inputName.setAttribute("value", `${item.name}`);
    listItem.appendChild(inputName);
    // Create and append the text content
    const textContent = document.createElement("span");
    textContent.classList.add("name__list");
    textContent.textContent = `${item.name} - ${item.price * item.quantity
      } R  количество - ${item.quantity}`;
    textContent.innerHTML = `${item.name} - <b>${item.price * item.quantity} R</b> количество - <b>${item.quantity}</b>`;

    listItem.appendChild(textContent);

    // Create and append the remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("del");
    removeButton.textContent = "Удалить";
    removeButton.addEventListener("click", () => removeFromCart(item.id));

    listItem.appendChild(removeButton);
    cartContainer.appendChild(listItem);

  },
  );

  // Перерасчитываем итоговую сумму заказа
  const totalIndex = orderArr.findIndex((item) => item.id === "total");
  if (totalIndex !== -1) {
    const totalSum = orderArr.reduce(
      (total, item) => -item.summ + total + item.summ,
      0
    );
    orderArr[totalIndex].summ = Math.abs(totalSum); // Обновляем итоговую сумму заказа
    orderArr[totalIndex].price = Math.abs(totalSum); // Обновляем итоговую сумму заказа
    dataToInput(orderArr, inputData); // Обновляем input-элемент на странице
  }
}

function increase(event) {
  if (event.target.classList.contains("plus")) {
    let itog = event.target.closest(".ads").querySelector(".itog");
    itog.textContent = parseInt(itog.textContent, 10) + 1;
  }
}

function decrease(event) {
  if (event.target.classList.contains("minus")) {
    let itog = event.target.closest(".ads").querySelector(".itog");
    itog.textContent = Math.max(0, parseInt(itog.textContent, 10) - 1);
  }
}

function sendCartItems() {
  const cartData = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price * item.quantity,
    quantity: item.quantity,
  }));
  fetch("./send.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: inputData,
  })
  .then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {
    console.error("Error:", error);
  });
  console.log(cartData);
}

function sendDataToTelegram(formData) {
  const botToken = "7877529594:AAHxhqHMfoIiMqFpd1ltTSSALRjt9yrMIo4";
  const chatID = '170195649';
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  console.log(formData);
  const message = `
      НОВЫЙ ЗАКАЗ:
      <b>Имя:</b> ${formData.product}
      <b>Фамилия:</b> ${formData.name}
      <b>Дата рождения:</b> ${formData.tel}
      <b>Пол:</b> ${formData.home}
      <b>Хобби:</b> ${formData.count_pers}
      <b>Примечание:</b> ${formData.promokod}`;
  const params = {
    chat_id: chatId, // ID чата
        text: message, // Текст сообщения
        parse_mode: 'HTML' // Режим парсинга HTML
    };

    return fetch(apiUrl, {
      method: 'POST', // Метод отправки
      headers: {
          'Content-Type': 'application/json', // Указываем тип содержимого
      },
      body: JSON.stringify(params) // Преобразуем параметры в JSON
  }).then(response => response.json()); // Возвращаем ответ в формате JSON

}





function orderAdd(productId, productName, productPrice, productQuantity) {
  orderArr.push({
    id: productId,
    name: productName,
    price: productPrice,
    count: productQuantity,
    summ: productPrice * productQuantity,
  });
  addTotalToOrderArr(orderArr);
  return orderArr;
}

function addTotalToOrderArr(orderArr) {
  const totalIndex = orderArr.findIndex((item) => item.id === "total");
  if (totalIndex !== -1) {
    orderArr.splice(totalIndex, 1);
  }
  const totalSum = orderArr.reduce((total, item) => total + item.summ, 0);
  orderArr.push({
    id: "total",
    name: "Общая сумма",
    price: totalSum,
    count: 1,
    summ: totalSum, // Используем summ вместо СУММА
  });

  dataToInput(orderArr, inputData);
  console.log(inputData)
  return orderArr;
}
function dataToInput(data, input) {
  summory.textContent = `${data[data.length - 1].price} рублей`
  summo.textContent = `${data[data.length - 1].price} рублей`
  let result = "";
  if (Array.isArray(data)) {
    data.forEach((d) => {
      const str = JSON.stringify(d);
      result += str;
      input.value = result;
    });
  }
  console.log(result)
  return result;
}

function applyPromoCode(promoCode) {
  const promoCodes = [
    { code: "a", discount: 20 }, // 20% discount
    { code: "b", discount: 10 }, // 10% discount
    // Add more promo codes here
  ];

  const promoCodeFound = promoCodes.find((code) => code.code === promoCode);

  if (promoCodeFound) {
    const numericItems = orderArr.filter(
      (item) => typeof item.summ === "number"
    );
    const totalSum = numericItems.reduce((total, item) => total + item.summ, 0);
    const discountAmount = (totalSum / 100) * promoCodeFound.discount;
    const newTotalSum = totalSum - discountAmount;

    // Remove the existing "total" item from the array
    const totalIndex = orderArr.findIndex((item) => item.id === "total");
    if (totalIndex !== -1) {
      orderArr.splice(totalIndex, 1);
    }

    // Add a new "total" item with the updated total sum
    orderArr.push({
      id: "total",
      name: "Общая сумма",
      price: newTotalSum,
      count: 1,
      summ: newTotalSum,
      СУММА: newTotalSum,
    });
    console.log(inputData)
    dataToInput(orderArr, inputData);
  } else {
  }
}

/*document.querySelector('.btn-order').addEventListener("submit", () => {
  sendCartItems();
})*/

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // Отменяем стандартное поведение формы

      sendDataToTelegram(data)
          .then(result => {
              if (result.ok) {
                  // Если данные успешно отправлены
                  console.log('result ok')
              } else {
                  // Если произошла ошибка при отправке
                  console.log('result ne ok')
              }
          })
          .catch(error => {
              console.error('Error:', error);
          })
});

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResultsContainer");
  const resultsList = document.getElementById("searchResults");
  resultsList.innerHTML = "";
  closeSearch.style.display = "block";
  var searchInput = document.querySelector(".search__container");
  if (input) {
    searchInput.style.marginTop = "15px";
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(input) ||
        product.description.toLowerCase().includes(input)
    );
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.style.listStyle = "none";
        listItem.innerHTML = `
                    <div class="search__product">
                        <p class="ph" style="display:none">${product.id}</p>
                        <img class="simg" src="${product.image}" alt="${product.name}" style="width:100px;height:auto;">
                        <h3 class='desc_name'>${product.name}</h3>
                        <p class="cost">Цена: ${product.price} ₽</p>
                        <button class="add__to__cart">Перейти</button>
                    </div>
                    `;
        resultsList.appendChild(listItem);
      });
      resultsContainer.style.display = "block";

      // Добавляем обработчик клика на элементы результатов поиска
      const searchResults = document.querySelectorAll(".search__product");
      searchResults.forEach((result) => {
        result.addEventListener("click", () => {
          const productId = parseInt(result.querySelector(".ph").textContent);
          const product = products.find((p) => p.id === productId);
          if (product) {
            const productElement = document.querySelector(
              `[data-product-id="${productId}"]`
            );
            if (productElement) {
              productElement.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      });
    } else {
      resultsContainer.style.display = "none";
    }
  } else {
    resultsContainer.style.display = "none";
  }
}

function elementGetNone(pointer, element) {
  pointer.addEventListener('click', () => {
    element.style.display = 'none';
    document.querySelector('.cart__container').style.width = '600px';
  })
};
console.log(inputData.value)
