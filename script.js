// Quiz questions and answers
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language"],
    answer: 2
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    options: ["h1", "heading", "head"],
    answer: 0
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "variable", "const"],
    answer: 3
  },
  {
    question: "What does 'DOM' stand for in the context of web development?",
    options: ["Document Oriented Model", "Document Object Model", "Dynamic Object Model"],
    answer: 1
  },
  {
    question: "What function is used to convert a JavaScript object to a JSON string?",
    options: ["JSON.stringify()", "objectToJSON()", "convertToJSON()"],
    answer: 0
  },
  {
    question: "Which method is used to remove the last element from an array in JavaScript?",
    options: ["pop()", "removeLast()", "shift()", "splice()"],
    answer: 0
  },
  {
    question: "Which keyword is used to loop through elements in an array?",
    options: ["foreach", "loop", "for", "iterate"],
    answer: 2
  },
  {
    question: "What does 'NaN' stand for in JavaScript?",
    options: ["Not a Number", "New and Null", "No Action Needed"],
    answer: 0
  },
  {
    question: "Which method is used to add elements to the end of an array?",
    options: ["append()", "push()", "add()", "insert()"],
    answer: 1
  },
  {
    question: "What does the '===' operator in JavaScript check for?",
    options: ["Equality in value and type", "Equality in value", "Equality in type", "None of the above"],
    answer: 0
  }
];

// Initialize score, question index, and incorrect penalty
let score = 0;
let questionIndex = 0;
const incorrectPenalty = 10; // Deduct 10 seconds for an incorrect answer

// Load question and options
function loadQuestion() {
  const quizElement = document.getElementById("quiz");
  const question = document.createElement("h3");
  question.textContent = quizData[questionIndex].question;
  quizElement.innerHTML = "";
  quizElement.appendChild(question);

  const options = document.createElement("ul");
  quizData[questionIndex].options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = option;
    listItem.setAttribute("data-index", index);
    listItem.addEventListener("click", selectOption);
    options.appendChild(listItem);
  });

  quizElement.appendChild(options);
}

// Handle option selection
function selectOption(event) {
  const selectedOption = event.target;
  const selectedIndex = parseInt(selectedOption.getAttribute("data-index"));

  if (selectedIndex === quizData[questionIndex].answer) {
    score++;
  } else {
    timer -= incorrectPenalty; // Deduct time for incorrect answer
    if (timer < 0) {
      timer = 0; // Prevent negative timer values
    }
  }

  questionIndex++;
  if (questionIndex < quizData.length && timer > 0) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show quiz result
function showResult() {
  clearInterval(timerInterval); // Clear the timer interval

  const result = document.createElement("h3");
  result.textContent = `You scored ${score} out of ${quizData.length} questions.`;
  const resultDisplay = document.getElementById("quiz");
  resultDisplay.innerHTML = ""; // Clear the quiz content
  resultDisplay.appendChild(result);

  // Prompt for initials and store high score
  const initials = prompt("Enter your initials:");
  if (initials) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ initials, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
}

// Update the timer display
function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time: ${timer}`;
}

// Start the quiz when the start button is clicked
const startButton = document.getElementById("start");
startButton.addEventListener("click", startQuiz);

// Timer interval reference
let timerInterval;

// Function to start the quiz
function startQuiz() {
  questionIndex = 0;
  score = 0;
  loadQuestion();
  startTimer(); // Start the timer
  startButton.style.display = "none"; // Hide the start button
}

// Function to start the timer
function startTimer() {
  timer = 60; // Reset timer for each question
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timer--;
    updateTimerDisplay();

    if (timer <= 0) {
      clearInterval(timerInterval); // Stop the timer when it reaches 0
      showResult();
    }
  }, 1000);
}

// Load the first question
loadQuestion();
