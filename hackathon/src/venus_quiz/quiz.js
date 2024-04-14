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
    question: 'Why is Venus so hot?',
    answers: [
      { text: 'It\'s closest to the Sun', correct: false },
      { text: 'It has lots of volcanoes', correct: false },
      { text: 'Its thick atmosphere traps heat', correct: true },
      { text: 'It\'s covered in lava', correct: false }
    ],
    correctFeedback: "That's right! Venus is so hot because its thick atmosphere traps the Sun's heat, much like a greenhouse.",
    incorrectFeedback: "Good try, but Venus is actually hot because its thick atmosphere acts like a greenhouse, trapping all the heat!"
  },
  {
    question: 'What is special about how Venus spins?',
    answers: [
      { text: 'It spins very fast', correct: false },
      { text: 'It spins backwards', correct: true },
      { text: 'It doesn’t spin at all', correct: false },
      { text: 'It spins sideways', correct: false }
    ],
    correctFeedback: "Exactly! Venus spins the opposite way of most planets, which means the Sun rises in the west and sets in the east on Venus.",
    incorrectFeedback: "Not quite! Venus actually spins backwards compared to most planets, so the Sun appears to rise in the west!"
  },
  {
    question: 'How long is a day on Venus compared to a year?',
    answers: [
      { text: 'A day is shorter than a year', correct: false },
      { text: 'A day and a year are the same length', correct: false },
      { text: 'A day is longer than a year', correct: true },
      { text: 'Venus doesn’t have days and years', correct: false }
    ],
    correctFeedback: "Correct! One day on Venus is longer than one year. It takes longer for Venus to complete one spin on its axis than it does for it to orbit the Sun.",
    incorrectFeedback: "Almost! Interestingly, a day on Venus (one complete spin) actually lasts longer than a Venusian year (one orbit around the Sun)."
  },
  {
    question: 'What makes the clouds on Venus unique?',
    answers: [
      { text: 'They are made of water vapor', correct: false },
      { text: 'They are colorful', correct: false },
      { text: 'They rain diamonds', correct: false },
      { text: 'They contain sulfuric acid', correct: true }
    ],
    correctFeedback: "That's right! The clouds on Venus are made of sulfuric acid, which is very corrosive and dangerous.",
    incorrectFeedback: "Not exactly! The clouds on Venus are actually made of sulfuric acid, not water vapor or diamonds, and they aren't colorful either."
  },
  {
    question: 'How does the temperature on Venus compare to other planets in our solar system?',
    answers: [
      { text: 'It\'s the coldest because it\'s far from the Sun.', correct: false },
      { text: 'It\'s the hottest because of its thick atmosphere.', correct: true },
      { text: 'It\'s moderate like Earth.', correct: false },
      { text: 'It varies widely like on Mars.', correct: false }
    ],
    correctFeedback: "That's right! Venus is the hottest planet in our solar system, not because it's closest to the Sun, but because its thick atmosphere traps heat very effectively.",
    incorrectFeedback: "Not quite! Although Venus isn't the closest planet to the Sun, it is the hottest due to its thick atmosphere that traps heat very well."
  },
  {
    question: 'What would happen if you tried to stand on the surface of Venus?',
    answers: [
      { text: 'You would float because of low gravity.', correct: false },
      { text: 'You would be crushed by the high atmospheric pressure.', correct: true },
      { text: 'You would slide around because of icy conditions.', correct: false },
      { text: 'You would sink into the surface like quicksand.', correct: false }
    ],
    correctFeedback: "Exactly! The pressure on Venus is so high that it would feel like being deep underwater, and it would crush anything not specially designed to handle it.",
    incorrectFeedback: "Good guess, but actually, the pressure on Venus is extremely high, more like being deep underwater than experiencing any other condition mentioned."
  }
];
