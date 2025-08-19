document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;

    // Заглушка для перевірки користувачів
    if (login === "user" && password === "123") {
        localStorage.setItem("role", "Персонал");
        window.location.href = "service.html";
    } else {
        alert("Невірні дані або недостатньо прав.");
    }
});
