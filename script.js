const quizStart = document.querySelector('#quizStart');
const intro = document.querySelector('.intro');
const questionContainer = document.querySelector('.questionContainer');
const resultsContainer = document.querySelector('.resultsContainer');
const answers = document.querySelectorAll('.answer');
const nextButton = document.querySelector('#nextButton');
const resultsButton = document.querySelector('#resultsButton');
const quizRetry = document.querySelector('#quizRetry');
const incorrect = document.querySelectorAll('.incorrect');
const correct = document.querySelector('.correct');
const questionText = document.querySelector('#questionText');
const questionImage = document.querySelector('#question-img');
const finalScoreDisplay = document.querySelector('#finalScoreDisplay');
const finalScoreRatio = document.querySelector('#finalScoreRatio');

let score = 0;
let questionNumber = 1;

quizStart.addEventListener('click', () => {
  intro.classList.add('hidden');
  questionContainer.classList.remove('hidden');
});

resultsButton.addEventListener('click', () => {
  questionContainer.classList.add('hidden');
  resultsContainer.classList.remove('hidden');
  finalScoreDisplay.innerHTML = `${((score / questions.length) * 100).toFixed(
    1
  )}%`;
  finalScoreRatio.innerHTML = `${score} / ${questions.length}`;
});

quizRetry.addEventListener('click', () => {
  refreshPage();
});

let refreshPage = () => {
  window.location.reload();
};

for (var i = 0; i < answers.length; i++) {
  let element = answers[i];
  element.addEventListener('click', () => {
    element.classList.add('clicked');
    submittedAnswer(element);
    element.classList.contains('correct') ? score++ : score;
  });
}

nextButton.addEventListener('click', () => {
  for (var i = 0; i < answers.length; i++) {
    nextQuestionStyle(answers[i]);
  }
  nextQuestionContent();

  if (questionNumber < questions.length - 1) {
    disableNextButton();
  } else {
    showResultsButton();
  }
  questionNumber++;
});

const submittedAnswer = (element) => {
  questionNumber < questions.length
    ? enableNextButton()
    : enableResultsButton();

  if (element.classList.contains('correct') == false) {
    element.style.backgroundColor = 'red';
  }
  for (var i = 0; i < answers.length; i++) {
    answers[i].disabled = true;
    if (
      answers[i].classList.contains('correct') == false &&
      answers[i].classList.contains('clicked') == false
    ) {
      answers[i].style.opacity = '.5';
    } else if (answers[i].classList.contains('correct') == true) {
      answers[i].style.backgroundColor = 'green';
    }
  }
};

const disableNextButton = () => {
  nextButton.disabled = true;
  nextButton.style.opacity = '.5';
};

const enableNextButton = () => {
  nextButton.disabled = false;
  nextButton.style.backgroundColor = 'rgba(14, 96, 219)';
  nextButton.style.opacity = '.9';
};

const showResultsButton = () => {
  nextButton.classList.add('hidden');
  resultsButton.classList.remove('hidden');
};

const enableResultsButton = () => {
  resultsButton.disabled = false;
  resultsButton.style.backgroundColor = 'rgba(14, 96, 219)';
  resultsButton.style.opacity = '.9';
};

const nextQuestionStyle = (element) => {
  if (element.classList.contains('clicked')) {
    element.classList.remove('clicked');
  }
  if (element.classList.contains('correct')) {
    element.classList.remove('correct');
  }
  element.disabled = false;
  element.style.opacity = '.9';
  element.style.backgroundColor = 'rgba(14, 96, 219)';
};

const nextQuestionContent = () => {
  questionText.innerHTML = questions[questionNumber].question;
  questionImage.src = questions[questionNumber].image;
  let newCorrect = Math.floor(Math.random() * 4);
  let wrongCount = 0;
  for (i = 0; i < answers.length; i++) {
    if (i == newCorrect) {
      answers[i].innerHTML = questions[questionNumber].correctAnswer;
      answers[i].classList.add('correct');
    } else {
      answers[i].innerHTML = questions[questionNumber].wrongAnswers[wrongCount];
      wrongCount++;
    }
  }
};

const questions = [
  {},
  {
    image: 'strips/Picture3.png',
    question: 'What rhythm is shown in this strip?',
    correctAnswer: 'Sinus Bradycardia',
    wrongAnswers: [
      'Junctional Rhythm',
      'High Grade AV Block',
      'Sinus Tachycardia',
    ],
  },
  {
    image: 'strips/Picture18.png',
    question: 'What is shown in this strip?',
    correctAnswer: 'Sinus Pause',
    wrongAnswers: [
      '2nd degree AV Block Type I',
      'Atrial Fibrillation',
      'Supraventricular Ectopic',
    ],
  },
  {
    image: 'strips/Picture20.png',
    question: 'What is the rhythm shown in this strip?',
    correctAnswer: 'Atrial Paced Rhythm',
    wrongAnswers: [
      'Dual Paced Rhythm',
      'Ventricular Paced Rhythm',
      'Sinus Bradycardia with Atrial Hypertrophy',
    ],
  },
];
