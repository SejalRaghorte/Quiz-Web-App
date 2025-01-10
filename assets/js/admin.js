// Admin Logic
let questions = [];

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    displayUserScores();

    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('add-question').addEventListener('click', addNewQuestion);
});

function loadQuestions() {
    fetch('data/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions();
        })
        .catch(error => console.error('Error loading questions:', error));
}

function displayQuestions() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p><strong>Options:</strong> ${question.options.join(', ')}</p>
            <p><strong>Correct Answer:</strong> ${question.answer}</p>
            <button onclick="editQuestion(${index})" class="btn btn-warning btn-sm me-2">Edit</button>
            <button onclick="deleteQuestion(${index})" class="btn btn-danger btn-sm">Delete</button>
        `;
        questionList.appendChild(questionDiv);
    });
}

function addNewQuestion() {
    const question = prompt('Enter the question:');
    const options = prompt('Enter options (comma-separated):').split(',').map(option => option.trim());
    const answer = prompt('Enter the correct answer:');

    if (question && options.length > 1 && answer) {
        questions.push({ question, options, answer });
        saveQuestions();
        displayQuestions();
    } else {
        alert('Invalid input. Please try again.');
    }
}

function editQuestion(index) {
    const question = prompt('Edit the question:', questions[index].question);
    const options = prompt('Edit options (comma-separated):', questions[index].options.join(',')).split(',').map(option => option.trim());
    const answer = prompt('Edit the correct answer:', questions[index].answer);

    if (question && options.length > 1 && answer) {
        questions[index] = { question, options, answer };
        saveQuestions();
        displayQuestions();
    } else {
        alert('Invalid input. No changes were made.');
    }
}

function deleteQuestion(index) {
    if (confirm('Are you sure you want to delete this question?')) {
        questions.splice(index, 1);
        saveQuestions();
        displayQuestions();
    }
}

function saveQuestions() {
    // In a real application, you would send this data to a server
    // For this example, we'll just log it to the console
    console.log('Saving questions:', questions);
}

function displayUserScores() {
    const userScores = document.getElementById('user-scores');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const scores = users.filter(user => user.role === 'user' && user.score !== undefined)
                        .map(user => `<p>${user.username}: ${user.score}</p>`)
                        .join('');
    userScores.innerHTML = scores || '<p>No scores available.</p>';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}