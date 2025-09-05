document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // зупиняємо стандартну відправку форми

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!login || !password) {
      alert("Будь ласка, введіть логін і пароль");
      return;
    }

    try {
      // Завантажуємо дані користувачів
      const response = await fetch("user.json");
      if (!response.ok) {
        throw new Error("Не вдалося завантажити user.json");
      }
      const users = await response.json();

      // Пошук користувача
      const user = users.find(u => u.login === login && u.password === password);

      if (!user) {
        alert("Невірний логін або пароль");
        return;
      }

      // Перевірка підтримки геолокації
      if (!navigator.geolocation) {
        alert("Ваш браузер не підтримує геолокацію");
        return;
      }

      // Отримання геопозиції
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Збереження користувача і координат у localStorage
          localStorage.setItem("currentUser", JSON.stringify({
            ...user,
            latitude: lat,
            longitude: lon,
            loginTime: new Date().toISOString()
          }));

          // Перехід на захищену сторінку
          window.location.href = "service.html";
        },
        () => {
          alert("Вам не дозволено увійти без підтверждення геолокації");
        }
      );

    } catch (err) {
      console.error("Помилка при завантаженні user.json:", err);
      alert("Помилка системи авторизації");
    }
  });
});
