document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let login = document.getElementById("login").value.trim();
    let password = document.getElementById("password").value.trim();

    fetch("user.json")
        .then(r => r.json())
        .then(users => {
            let user = users.find(u => u.login === login && u.password === password);

            if (user && (user.role === "Персонал" || user.role === "Адміністратор")) {
                navigator.geolocation.getCurrentPosition(pos => {
                    localStorage.setItem("geo", JSON.stringify({ lat: pos.coords.latitude, lon: pos.coords.longitude }));
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.href = "service.html";
                });
            } else {
                alert("Невірні дані або недостатньо прав.");
            }
        });
});
