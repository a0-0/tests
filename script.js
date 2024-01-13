const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");

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
        setTimeout(showResult, 500); // Add a delay to ensure the result is displayed
    }
}

function showResult() {
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";

    const percentage = (userScore / questions.length) * 100;
    scoreElement.textContent = `Your Score: ${userScore} out of ${questions.length} (${percentage.toFixed(2)}%)`;

    if (unansweredQuestions.length > 0) {
        const unansweredSection = document.getElementById("unanswered-section");
        unansweredSection.innerHTML = "<h3>Unanswered Questions:</h3>";

        unansweredQuestions.forEach((index) => {
            const questionText = document.createElement("p");
            questionText.textContent = `${questions[index].question}`;
            unansweredSection.appendChild(questionText);
        });
    }
}

// Initial question load
showQuestion();
