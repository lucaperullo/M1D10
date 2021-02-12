const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "Hey im a question!?",
    choice1: "yes you are",
    choice2: "no you are not!",
    choice3: "none of the above",
    choice4: "who cares im aint even getting paied for this.",
    answer: 4,
  },
  {
    question: "Hey im a question!?",
    choice1: "yes you are",
    choice2: "no you are not!",
    choice3: "none of the above",
    choice4: "who cares im aint even getting paied for this.",
    answer: 4,
  },
  {
    question: "Hey im a question!?",
    choice1: "yes you are",
    choice2: "no you are not!",
    choice3: "none of the above",
    choice4: "who cares im aint even getting paied for this.",
    answer: 4,
  },
  {
    question: "Hey im a question!?",
    choice1: "yes you are",
    choice2: "no you are not!",
    choice3: "none of the above",
    choice4: "who cares im aint even getting paied for this.",
    answer: 4,
  },
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionsCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 300);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startGame();
