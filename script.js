const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const loadingContainer = document.getElementById("loading-container");

let currentQuestionIndex = 0;
let userScore = 0;
let unansweredQuestions = [];

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById("question-text").textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        userScore++;
    } else {
        unansweredQuestions.push(currentQuestionIndex);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Show loading animation before showing the result
        loadingContainer.style.display = "flex";
        setTimeout(() => {
            loadingContainer.style.display = "none";
            showResult();
        }, 2000);
    }
}

function showResult() {
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";

    const percentage = (userScore / questions.length) * 100;
    scoreElement.textContent = `Your Score: ${userScore} out of ${questions.length} (${percentage.toFixed(2)}%)`;

    // Animated percentage circle
    const percentageCircle = document.getElementById("percentage-circle");
    percentageCircle.style.strokeDasharray = `${percentage} 100`;

    if (unansweredQuestions.length > 0) {
        const unansweredSection = document.getElementById("unanswered-section");
        unansweredSection.innerHTML = "<h3>Unanswered Questions:</h3>";

        unansweredQuestions.forEach((index) => {
            const questionText = document.createElement("p");
            questionText.textContent = `${questions[index].question}`;
            unansweredSection.appendChild(questionText);
        });
    }

    // Fetch student name from index.js (replace with the actual code)
    const studentName = "John Doe"; // Replace with actual code to fetch the name

    const studentNameElement = document.getElementById("student-name");
    studentNameElement.textContent = `Student Name: ${studentName}`;
}

// Handle page refresh
window.addEventListener("beforeunload", function (event) {
    // Save current question index and user score to sessionStorage
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    sessionStorage.setItem("userScore", userScore);
});

// Check if page is loaded from a refresh
document.addEventListener("DOMContentLoaded", function () {
    const storedIndex = sessionStorage.getItem("currentQuestionIndex");
    const storedScore = sessionStorage.getItem("userScore");

    if (storedIndex !== null && storedScore !== null) {
        // Restore the current question index and user score
        currentQuestionIndex = parseInt(storedIndex);
        userScore = parseInt(storedScore);

        // Load the appropriate state (question or result)
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        // Initial question load
        showQuestion();
    }
});
