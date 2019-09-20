const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
  question: "What is the Capital of Nigeria",
  choice1: "Abuja",
  choice2: "Lagos",
  choice3: "Accra",
  choice4: "Dakar",
  answer: 1
  },
  {
  question:
    "What is the Capital of Ethiopia",
  choice1: "Addis Ababa",
  choice2: "Niger",
  choice3: "Djibouti",
  choice4: "Nairobi",
  answer: 1
  },
  {
  question: "What is the Capital of Cameroun",
  choice1: "Abuja",
  choice2: "Lagos",
  choice3: "Accra",
  choice4: "Yaounde",
  answer: 4
  },
  {
  question:
    "What is the Capital of Algeria",
  choice1: "Addis Ababa",
  choice2: "Algiers",
  choice3: "Djibouti",
  choice4: "Nairobi",
  answer: 2
  },
  {
  question: "What is the Capital of Chad",
  choice1: "N'Djamena",
  choice2: "Lagos",
  choice3: "Accra",
  choice4: "Dakar",
  answer: 1
  },
  {
  question:
    "What is the Capital of Egypt",
  choice1: "Addis Ababa",
  choice2: "Cairo",
  choice3: "Djibouti",
  choice4: "Nairobi",
  answer: 2
  },
  {
  question: "What is the Capital of Cape Verde",
  choice1: "Abuja",
  choice2: "Lagos",
  choice3: "Praia",
  choice4: "Dakar",
  answer: 3
  },
  {
  question:
    "What is the Capital Eritrea",
  choice1: "Addis Ababa",
  choice2: "Niger",
  choice3: "Djibouti",
  choice4: "Asmara",
  answer: 4
  },
  {
  question: "What is the Capital of Gabon",
  choice1: "Abuja",
  choice2: "Lagos",
  choice3: "Accra",
  choice4: "Libreville",
  answer: 4
  },
  {
  question:
    "What is the Capital of Kenya",
  choice1: "Addis Ababa",
  choice2: "Algiers",
  choice3: "Djibouti",
  choice4: "Nairobi",
  answer: 4
  }
];

// fetch("questions.json")
//   .then(res => {
//     return res.json();
//   })
//   .then(loadedQuestions => {
//     console.log(loadedQuestions);
//     questions = loadedQuestions;
//     startGame();
//   })
//   .catch(err => {
//     console.error(err);
//   });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
