// Core Logic: SignUp /Login

document.getElementById("signup-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    signUp(username, password, role);
  });
  
  document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const role = document.getElementById("login-role").value;
    login(username, password, role);
  });
  