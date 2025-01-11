<h3> Quiz Web App </h3>

This project provides a simple web-based quiz management system that allows administrators to manage quiz questions, view user scores, and handle user authentication. The system includes functionalities for adding, editing, and deleting questions, along with displaying users' quiz results. It leverages localStorage for data persistence, meaning the quiz data and user scores are saved in the user's browser.

<h5>Technologies Used</h5>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>BootStrap</li>
  <li>JavaScript</li>
</ul>

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

<h4>How to Use</h4>

<h5>Login</h5>
<ul>
  <li>Before accessing the quiz management system, you’ll need to log in.</li>
  <li>The system supports two types of users:</li>
  <ol>
    <li>Admin: Admins have access to the quiz management interface, where they can add, edit, delete questions, and view user scores.</li>
    <li>User: Regular users can participate in the quiz and view their own scores after completion.</li>
  </ol>


<li>Depending on your role, you'll be directed to the appropriate dashboard:</li>
<ol>
  <li>Admins can manage quiz questions and view scores for all users.</li>
  <li>Users will only see their quiz results and scores.</li>
</ol>
  
</ul>

<h5>Manage Questions (Admin)</h5>
<ul>
  <li>Add new questions: Admins can create new quiz questions by specifying the question, options, and the correct answer.</li>
  <li>Edit existing questions: Modify any existing question or its options.</li>
  <li>Delete questions: Remove questions from the system that are no longer relevant.</li>
</ul>

<h5>Participate in Quiz (User)</h5>
<ul>
  <li>Once logged in as a user, you can take the quiz by answering the displayed questions and submitting your answers.</li>
  <li>After completing the quiz, your score will be calculated and displayed.</li>
</ul>

<h5>View User Scores (Admin)</h5>
<ul>
  <li>Admins can view scores for all users who have participated in the quiz. The scores are listed along with the usernames of the participants.</li>
</ul>

<h5>Logout</h5>
<ul>
  <li>When you're done, click the "Logout" button to log out of the application.</li>
  <li>After logging out, you will be redirected to the login page.</li>
</ul>

<h5>Share Your Score</h5>
<ul>
  <li>After completing a quiz, you can share your score with others by generating a unique URL.</li>
  <li>The system allows users to copy the link to share their scores easily.</li>
</ul>



