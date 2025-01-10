document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    const startQuizButton = document.getElementById('start-quiz');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', startQuiz);
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    displayWelcomeMessage();
});

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
    }
}

function startQuiz() {
    const questionCount = document.getElementById('question-count').value;
    localStorage.setItem('questionCount', questionCount);
    window.location.href = 'quiz.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function displayWelcomeMessage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const welcomeMessage = document.createElement('p');
        welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
        welcomeMessage.className = 'text-center mt-3';
        document.querySelector('.card-body').prepend(welcomeMessage);
    }
}

