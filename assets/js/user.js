let questions = [];
let currentQuestion = 0;
let score = 0;
let totalQuestions = 0;

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

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        loadQuestions();
    }

    const shareScoreButton = document.getElementById('share-score');
    if (shareScoreButton) {
        shareScoreButton.addEventListener('click', shareScore);
    }

    const returnMainButton = document.getElementById('return-main');
    if (returnMainButton) {
        returnMainButton.addEventListener('click', () => window.location.href = 'main.html');
    }
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

function loadQuestions() {
    fetch('data/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            totalQuestions = parseInt(localStorage.getItem('questionCount')) || 5;
            // Shuffle the questions array
            questions = shuffleArray(questions);
            // Slice the array to get only the required number of questions
            questions = questions.slice(0, totalQuestions);
            displayQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayQuestion() {
    if (currentQuestion < totalQuestions) {
        const question = questions[currentQuestion];
        document.getElementById('question').textContent = question.question;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'btn btn-outline-primary w-100 mb-2';
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
        document.getElementById('status').textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    } else {
        showResult();
    }
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestion];
    if (selectedAnswer === question.answer) {
        score++;
    }
    currentQuestion++;
    displayQuestion();
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').textContent = `${score} out of ${totalQuestions}`;

    // Save score
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.score = score;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            users[userIndex].score = score;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

function shareScore() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser ? currentUser.username : 'Anonymous';
    const shareUrl = `${window.location.origin}/share-score.html?score=${score}&total=${totalQuestions}&username=${username}`;
    
    // Create a temporary input element to copy the URL
    const tempInput = document.createElement('input');
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Share link copied to clipboard! You can now paste and share it.');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

