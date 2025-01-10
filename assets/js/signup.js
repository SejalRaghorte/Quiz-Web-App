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

    if (role === 'admin' && !isValidAdminPassword(password)) {
        alert('Admin password should include at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already exists. Please choose a different one.');
        return;
    }

    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign-up successful! Please log in.');
    window.location.href = 'login.html';
}

function isValidAdminPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}