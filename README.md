<h3> Quiz Web App </h3>

This project provides a simple web-based quiz management system that allows administrators to manage quiz questions, view user scores, and handle user authentication. The system includes functionalities for adding, editing, and deleting questions, along with displaying users' quiz results. It leverages localStorage for data persistence, meaning the quiz data and user scores are saved in the user's browser.

<h4> Features </h4>

<h5>Manage Quiz Questions</h5>
<ul>
  <li>You can view a list of all quiz questions stored locally in your browser’s localStorage. </li>
  <li>The system allows you to easily add new questions by providing a question prompt, multiple answer options, and selecting the correct answer.</li>
  <li> You have the ability to edit existing questions—update their wording, answer options, or the correct answer.</li>
  <li> If you need to remove any question, simply delete it from the list with just a click.</li>
</ul>

<h5>User Scores Display</h5>
<ul>
  <li>The system keeps track of users who have participated in the quiz and their scores.</li>
  <li>You can view the scores of all users who have completed the quiz, with only users who have a valid score being displayed.</li>
</ul>

<h5>User Authentication</h5>
<ul>
  <li>Only authenticated users (admins or users with appropriate roles) are allowed to access the quiz management system.</li>
  <li>If a user isn’t authenticated, they are automatically redirected to the login page, ensuring that only authorized personnel can manage the quiz questions or view the scores.</li>
</ul>

<h5>Persistent Data</h5>
<ul>
  <li>To ensure your quiz data is saved even after page reloads, both the questions and user scores are stored in the browser’s localStorage.</li>
  <li>If no questions are found in localStorage, the system fetches a set of default questions from a questions.json file and saves them for future use, making it easy to get started without additional setup.
</li>
</ul>


