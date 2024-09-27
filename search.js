// Get the checkbox and menu list elements
const checkbox = document.getElementById("burger-checkbox");
const menuList = document.querySelector(".menu-list");

// Add an event listener to each menu item
document.querySelectorAll(".menu-item").forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    // Toggle the checkbox state
    checkbox.checked = false;
  });
});
