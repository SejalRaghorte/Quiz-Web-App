// Quiz Logic for users

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Fetch questions from questions.json
fetch("../data/questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data.questions;
    displayQuestion();
  })
  .catch((error) => console.error("Error fetching questions:", error));

// Display a question
function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showScore();
    return;
  }

  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => handleAnswer(option);
    optionsContainer.appendChild(button);
  });
}

// Handle answer selection
function handleAnswer(selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].correct;

  if (selectedOption === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  displayQuestion();
}

// Show final score
function showScore() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById("final-score").textContent = `Your Score: ${score} / ${questions.length}`;

  // Save user score in localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((user) =>
    user.username === currentUser.username ? { ...user, score } : user
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
}
