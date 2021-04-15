const quizStart = document.querySelector('#quizStart');
const intro = document.querySelector('.intro');
const questionContainer = document.querySelector('.questionContainer');
const answers = document.querySelectorAll('.answer');
const nextButton = document.querySelector('#nextButton');
const incorrect = document.querySelectorAll('.incorrect');
const correct = document.querySelector('.correct');
const questionText = document.querySelector('#questionText');
const questionImage = document.querySelector('#question-img');

let score = 0;
let questionNumber = 0;

quizStart.addEventListener('click', () => {
  intro.classList.add('hidden');
  questionContainer.classList.remove('hidden');
});

for (var i = 0; i < answers.length; i++) {
  let element = answers[i];
  element.addEventListener('click', () => {
    element.classList.add('clicked');
    submittedAnswer(element);
    questionNumber++;
    element.classList.contains('correct') ? score++ : score;
  });
}

nextButton.addEventListener('click', () => {
  for (var i = 0; i < answers.length; i++) {
    nextQuestionStyle(answers[i]);
  }
  nextQuestionContent();
  disableNextButton();
});

const submittedAnswer = (element) => {
  enableNextButton();
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
  questionText.innerHTML = questions[0].question;
  questionImage.src = questions[0].image;
  let newCorrect = Math.floor(Math.random() * 4);
  let wrongCount = 0;
  for (i = 0; i < answers.length; i++) {
    if (i == newCorrect) {
      answers[i].innerHTML = questions[0].correctAnswer;
      answers[i].classList.add('correct');
      console.log('why');
    } else {
      answers[i].innerHTML = questions[0].wrongAnswers[wrongCount];
      wrongCount++;
    }
  }
};

const questions = [
  {
    image: 'strips/Picture3.png',
    question: 'What is the rhythm shown in this strip?',
    correctAnswer: 'Atrial Flutter',
    wrongAnswers: [
      'Ventricular Tachycardia',
      'High Grade AV Block',
      'Supraventricular Tachycardia',
    ],
  },
];
