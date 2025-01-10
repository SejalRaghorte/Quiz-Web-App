// Core Logic: SignUp /Login

// Function to handle user signup
function signUp(username, password, role) {
    if (!username || !password || !role) {
      alert("All fields are required for sign-up!");
      return;
    }
   
    // Password validation
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if the username already exists
    if (users.some((user) => user.username === username)) {
      alert("Username already exists. Please choose a different one.");
      return;
    }
  
    // Add new user to the users array
    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Sign-Up Successful! Please login.");
    window.location.href = "login.html"; // Redirect to login page
  }
  
  // Function to handle user login
  function login(username, password, role) {
    if (!username || !password || !role) {
      alert("All fields are required for login!");
      return;
    }
  
    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if user exists and credentials match
    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
  
    if (user) {
      alert("Login Successful!");
  
      // Redirect based on the user's role
      if (role === "user") {
        window.location.href = "quiz.html"; // Redirect to quiz page
      } else if (role === "admin") {
        window.location.href = "admin.html"; // Redirect to admin dashboard
      }
    } else {
      alert("Invalid credentials! Please try again.");
    }
  }
  
  // Function to handle logout
  function logout() {
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Redirect to login page
  }
  
  // Function to display stored users in localStorage (Admin Only)
  function displayUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTable = document.getElementById("userTable");
  
    if (userTable) {
      users.forEach((user, index) => {
        const row = userTable.insertRow(index + 1); // Skip the header row
        row.insertCell(0).textContent = index + 1; // User ID
        row.insertCell(1).textContent = user.username; // Username
        row.insertCell(2).textContent = user.role; // Role
      });
    }
  }
  
  // Function to display user scores (Admin Only)
  function displayUserScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    const scoresTable = document.getElementById("scoresTable");
  
    if (scoresTable) {
      scores.forEach((score, index) => {
        const row = scoresTable.insertRow(index + 1); // Skip the header row
        row.insertCell(0).textContent = index + 1; // ID
        row.insertCell(1).textContent = score.username; // Username
        row.insertCell(2).textContent = score.score; // Score
      });
    }
  }
  
  // Utility to save user score
  function saveScore(username, score) {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ username, score });
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  
  // Add event listeners based on the current page
document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the signup page
    if (document.getElementById("signUpButton")) {
      document.getElementById("signUpButton").addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        signUp(username, password, role);
      });
    }
  
    // Check if we're on the login page
    if (document.getElementById("loginButton")) {
      document.getElementById("loginButton").addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        login(username, password, role);
      });
    }
  
    // Check if we're on the admin page
    if (document.getElementById("userTable") && document.getElementById("scoresTable")) {
      displayUsers();
      displayUserScores();
    }
  });