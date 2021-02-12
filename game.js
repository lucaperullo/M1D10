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
    question: "What does CSS stand for?",
    choice1: "Computer Style Sheets",
    choice2: "Colorful Style Sheets",
    choice3: "Cascading Style Sheets",
    choice4: "none of the above",
    answer: 3,
  },
  {
    question:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    choice1: "At the end of the document",
    choice2: "In the head section",
    choice3: "In the body section",
    choice4: "In the css",
    answer: 2,
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    choice1: "css",
    choice2: "script",
    choice3: "style",
    choice4: "stylesheet",
    answer: 3,
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    choice1: "styles",
    choice2: "style",
    choice3: "font",
    choice4: "class",
    answer: 2,
  },
  {
    question: "Which is the correct CSS syntax?",
    choice1: "body:color=black",
    choice2: "{body;color:black}",
    choice3: "body{color:black}",
    choice4: "none of the above",
    answer: 3,
  },
  {
    question: "How do you insert a comment in a CSS file?",
    choice1: "'this is a comment'",
    choice2: "//this is a comment//",
    choice3: "/*this is a comment*/",
    choice4: "//this is a comment",
    answer: 3,
  },
  {
    question: "Which CSS property controls the text size?",
    choice1: "font-size",
    choice2: "text-size",
    choice3: "font-wight",
    choice4: "font-height",
    answer: 1,
  },
  {
    question:
      "What is the correct CSS syntax for making all the <p> elements bold?",
    choice1: "<p style='font-size:bold'/>",
    choice2: "<p style='text-size:bold/>",
    choice3: "p{text-size:bold}",
    choice4: "who cares im aint even getting paied for this.",
    answer: 4,
  },
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

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
let audio = document.querySelector("audio");
let playPause = 0;
const playOrPause = () => {
  if (playPause == 0) {
    playPause = 1;
    audio.play();
  } else {
    playPause = 0;
    audio.pause();
  }
};
