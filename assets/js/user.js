// Quiz Logic for users

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 5;

document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('start-quiz');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', startQuiz);
    } else {
        loadQuestions();
    }

    const shareScoreButton = document.getElementById('share-score');
    if (shareScoreButton) {
        shareScoreButton.addEventListener('click', shareScore);
    }

    const returnMainButton = document.getElementById('return-main');
    if (returnMainButton) {
        returnMainButton.addEventListener('click', () => {
            window.location.href = 'main.html';
        });
    }
});

function startQuiz() {
    totalQuestions = parseInt(document.getElementById('question-count').value);
    window.location.href = 'quiz.html';
}

function loadQuestions() {
    fetch('data/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = shuffleArray(data).slice(0, totalQuestions);
            displayQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', 'btn-outline-primary', 'mb-2');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').textContent = `${score} out of ${questions.length}`;

    // Save score
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => 
        user.username === currentUser.username ? {...user, score: score} : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}

function shareScore() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const shareUrl = `${window.location.origin}/share-score.html?score=${score}&total=${questions.length}&username=${encodeURIComponent(currentUser.username)}`;
    
    // Create a temporary input element to copy the URL
    const tempInput = document.createElement('input');
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Share link copied to clipboard! You can now paste and share it.');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

