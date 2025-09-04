// ====== Бургер-меню для мобільних ======
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const backBtn = document.querySelector(".menu-back");
  const closeBtn = document.querySelector(".menu-close");
  const menuTitle = document.querySelector(".menu-title");

  let currentMenu = mobileMenu.querySelector("ul[data-level='root']");

  // Відкрити бургер-меню
  if (burger) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      showMenu("root", "Меню");
    });
  }

  // Закрити меню
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }

  // Кнопка "Назад"
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const parent = currentMenu.getAttribute("data-parent");
      if (parent) {
        showMenu(parent, parent === "root" ? "Меню" : parent);
      }
    });
  }

  // Обробка кліків по пунктам
  mobileMenu.addEventListener("click", function (e) {
    const link = e.target.closest("a[data-submenu]");
    if (link) {
      e.preventDefault();
      const submenu = link.getAttribute("data-submenu");
      showMenu(submenu, link.textContent.trim());
    }
  });

  // Функція показу меню
  function showMenu(level, title) {
    const menus = mobileMenu.querySelectorAll("ul");
    menus.forEach((m) => (m.style.display = "none"));

    const targetMenu = mobileMenu.querySelector(`ul[data-level='${level}']`);
    if (targetMenu) {
      targetMenu.style.display = "block";
      currentMenu = targetMenu;
    }

    menuTitle.textContent = title;
    backBtn.style.visibility = level === "root" ? "hidden" : "visible";
  }
});
