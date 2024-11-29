
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerLink = document.getElementById('register-link');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = "pariiyankh12@gmail.com";
        const password = 120378;


        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Ungültiger Benutzername oder Passwort');
        }
    });

    registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        const username = prompt('Geben Sie einen Benutzernamen ein:');
        const password = prompt('Geben Sie ein Passwort ein:');

        if (username && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(u => u.username === username);

            if (existingUser) {
                alert('Benutzername bereits vergeben');
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registrierung erfolgreich. Sie können sich jetzt anmelden.');
            }
        }
    });
});

