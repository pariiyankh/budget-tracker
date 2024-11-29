document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerLink = document.getElementById('register-link');

    // Login-Formular Event
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Eingaben aus dem Formular holen
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Benutzer aus localStorage laden
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Benutzerliste aus localStorage:', users);

        // Benutzer validieren
        const user = users.find(u => 
            u.username.toLowerCase() === username.toLowerCase() && 
            u.password === password
        );

        if (user) {
            // Login erfolgreich
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login erfolgreich!');
            window.location.href = 'index.html';
        } else {
            // Login fehlgeschlagen
            alert('Ungültiger Benutzername oder Passwort.');
        }
    });

    // Registrierung
    registerLink.addEventListener('click', function (e) {
        e.preventDefault();

        const username = prompt('Geben Sie einen Benutzernamen ein:').trim();
        const password = prompt('Geben Sie ein Passwort ein:');

        if (username && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Prüfen, ob Benutzername bereits existiert
            const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

            if (existingUser) {
                alert('Benutzername ist bereits vergeben.');
            } else {
                // Neuen Benutzer hinzufügen
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registrierung erfolgreich. Sie können sich jetzt anmelden.');
            }
        } else {
            alert('Bitte geben Sie einen gültigen Benutzernamen und ein Passwort ein.');
        }
    });
});
