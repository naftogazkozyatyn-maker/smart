document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!login || !password) {
      alert("Будь ласка, введіть логін і пароль");
      return;
    }

    try {
      // Завантаження користувачів
      const response = await fetch("user.json");
      const users = await response.json();

      const user = users.find(u => u.login === login && u.password === password);

      if (!user) {
        alert("Невірний логін або пароль");
        return;
      }

      // Запит геолокації
      if (!navigator.geolocation) {
        alert("Ваш браузер не підтримує геолокацію");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Збережемо дані користувача і координати у localStorage
          localStorage.setItem("currentUser", JSON.stringify({
            ...user,
            latitude: lat,
            longitude: lon,
            loginTime: new Date().toISOString()
          }));

          // Переходимо на захищену сторінку
          window.location.href = "service.html";
        },
        (error) => {
          console.error("Geo error:", error);
          alert("Вам не дозволено увійти без підтверждення геолокації");
        }
      );

    } catch (err) {
      console.error("Помилка при завантаженні user.json", err);
      alert("Помилка системи авторизації");
    }
  });
});
