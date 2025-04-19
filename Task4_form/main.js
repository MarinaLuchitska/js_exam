const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    emailError.textContent = '';
    passwordError.textContent = '';

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = 'Введіть коректний email';
        isValid = false;
    }

    if (!password || password.length < 6) {
        passwordError.textContent = 'Пароль має бути не менше 6 символів';
        isValid = false;
    }

    if (isValid) {
        alert('Успішна авторизація!');

    }
});