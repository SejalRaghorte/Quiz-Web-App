// Admin Logic
let questions = [];

// Fetch questions from questions.json
fetch("../data/questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data.questions;
    displayQuestions();
  })
  .catch((error) => console.error("Error fetching questions:", error));

// Display questions for the admin
function displayQuestions() {
  const questionList = document.getElementById("question-list");
  questionList.innerHTML = "";

  questions.forEach((question, index) => {
    const questionItem = document.createElement("div");
    questionItem.innerHTML = `
      <p>${index + 1}. ${question.question}</p>
      <button onclick="editQuestion(${index})">Edit</button>
      <button onclick="deleteQuestion(${index})">Delete</button>
    `;
    questionList.appendChild(questionItem);
  });
}

// Add a new question
function addQuestion(newQuestion, newOptions, newCorrect) {
  questions.push({
    id: questions.length + 1,
    question: newQuestion,
    options: newOptions,
    correct: newCorrect,
  });
  displayQuestions();
}

// Edit a question
function editQuestion(index) {
  const updatedQuestion = prompt("Enter the updated question:");
  const updatedOptions = prompt("Enter options (comma separated):").split(",");
  const updatedCorrect = prompt("Enter the correct answer:");

  if (updatedQuestion && updatedOptions && updatedCorrect) {
    questions[index] = {
      id: questions[index].id,
      question: updatedQuestion,
      options: updatedOptions,
      correct: updatedCorrect,
    };
    displayQuestions();
  }
}

// Delete a question
function deleteQuestion(index) {
  questions.splice(index, 1);
  displayQuestions();
}

// View user scores
function viewUserScores() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userScores = users
    .filter((user) => user.role === "user")
    .map((user) => `<p>${user.username}: ${user.score || 0}</p>`)
    .join("");
  document.getElementById("user-scores").innerHTML = userScores;
}
