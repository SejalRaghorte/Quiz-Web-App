document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!username || !password || !role) {
        alert('All fields are required!');
        return;
    }

    if (role === 'user' && password.length < 6) {
        alert('User password should be at least 6 characters long.');
        return;
    }

    if (role === 'admin' && password.length < 6) {
        alert('Admin password should be at least 6 characters long.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose a different one.');
        return;
    }

    users.push({ username, password, role, isAllowed: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign-up successful! Please log in.');
    window.location.href = 'login.html';
}
