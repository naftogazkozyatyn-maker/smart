// --- Burger Menu ---
function toggleMenu() {
  var menu = document.getElementById("sideMenu");
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
  } else {
    menu.classList.add("show");
  }
}

// Закриваємо меню при кліку поза ним
document.addEventListener("click", function(event) {
  var menu = document.getElementById("sideMenu");
  var burger = document.querySelector(".burger-menu");
  if (menu && menu.classList.contains("show") &&
      !menu.contains(event.target) &&
      !burger.contains(event.target)) {
    menu.classList.remove("show");
  }
});

// --- Приклад для майбутніх форм ---
// Ви можете додавати нові функції для обробки форм, валідації чи роботи з API тут
// Наприклад, відправка форми:
// function submitData() {
//   alert("Дані відправлено!");
// }
