document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        if (role === 'user' && !user.isAllowed) {
            alert('You are not authorized to give the test. Please contact the admin.');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        if (role === 'user') {
            window.location.href = 'main.html';
        } else if (role === 'admin') {
            window.location.href = 'admin.html';
        }
    } else {
        alert('Invalid credentials. Please try again.');
    }
}