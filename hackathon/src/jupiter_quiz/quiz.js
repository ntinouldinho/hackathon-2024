const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.createElement('div');
feedbackElement.className = 'feedback';
questionContainerElement.appendChild(feedbackElement);

let shuffledQuestions, currentQuestionIndex;
let currentQuestion;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  currentQuestion = question;
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  feedbackElement.textContent = ''; // Clear feedback text
  feedbackElement.style.display = 'none'; // Hide feedback
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(answer) {
  const correct = answer.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true; // Disable all buttons after one is clicked
    setStatusClass(button, button.dataset.correct);
  });
  feedbackElement.textContent = correct ? currentQuestion.correctFeedback : currentQuestion.incorrectFeedback;
  feedbackElement.style.display = 'block';
  if (correct) {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Exit';
      startButton.classList.remove('hide');
      startButton.removeEventListener('click', startGame); // Remove the initial event listener
      startButton.addEventListener('click', () => {
        window.location.href = 'previous.html'; // Redirect to previous.html
      });
    }
  } else {
    setTimeout(() => {
      resetState();
      showQuestion(currentQuestion); // Allow retry for the same question
    }, 2000); // Show incorrect feedback for 2 seconds before retry
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  element.classList.add(correct ? 'correct' : 'wrong');
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'How many moons does Jupiter have?',
    answers: [
      { text: '4', correct: false },
      { text: 'Over 20', correct: false },
      { text: '79', correct: true },
      { text: '100', correct: false }
    ],
    correctFeedback: "That's right! Jupiter has 79 known moons, including four large ones called the Galilean moons.",
    incorrectFeedback: "Not quite! Jupiter has 79 known moons, not just 4, not over 20, and not quite 100."
  },
  {
    question: 'What is Jupiter’s Great Red Spot?',
    answers: [
      { text: 'A large ocean', correct: false },
      { text: 'A big mountain', correct: false },
      { text: 'A giant storm', correct: true },
      { text: 'A deep crater', correct: false }
    ],
    correctFeedback: "Absolutely correct! The Great Red Spot is a huge storm on Jupiter that's been raging for at least 350 years.",
    incorrectFeedback: "Almost there, but not quite! The Great Red Spot isn't an ocean, mountain, or crater."
  },
  {
    question: 'How long is a day on Jupiter?',
    answers: [
      { text: '24 hours', correct: false },
      { text: '10 hours', correct: true },
      { text: '48 hours', correct: false },
      { text: '12 hours', correct: false }
    ],
    correctFeedback: "Correct! Jupiter spins so fast that a day there is only about 10 hours long!",
    incorrectFeedback: "Close, but not quite. A day on Jupiter is super short, only about 10 hours long because it spins so quickly!"
  },
  {
    question: 'What natural phenomenon on Jupiter is similar to Earth\'s northern lights?',
    answers: [
      { text: 'Rainbows', correct: false },
      { text: 'Cloud formations', correct: false },
      { text: 'Auroras', correct: true },
      { text: 'Snow', correct: false }
    ],
    correctFeedback: "That's right! Just like Earth, Jupiter has auroras. They occur when particles from space interact with its magnetic field, creating beautiful light shows.",
    incorrectFeedback: "Almost! The correct answer is auroras, similar to Earth's northern lights, not rainbows or snow."
  },
  {
    question: 'How does Jupiter protect Earth from comets and asteroids?',
    answers: [
      { text: 'By reflecting sunlight', correct: false },
      { text: 'By using its strong gravity to pull them away', correct: true },
      { text: 'By blowing them away with wind', correct: false },
      { text: 'By hiding Earth from them', correct: false }
    ],
    correctFeedback: "Exactly! Jupiter acts like a big guardian. Its strong gravity pulls in comets and asteroids, steering many away from Earth and keeping us safer.",
    incorrectFeedback: "Not exactly! Jupiter protects Earth by using its strong gravity to pull comets and asteroids away from us, not by blowing them away or hiding Earth."
  }
];
