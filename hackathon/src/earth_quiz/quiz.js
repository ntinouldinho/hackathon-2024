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
                question: "What is Earth often called due to its appearance from space?",
                answers: [
                    { text: "Red Planet", correct: false },
                    { text: "Blue Planet", correct: true },
                    { text: "Green Planet", correct: false },
                    { text: "Yellow Planet", correct: false }
                ],
                feedback: {
                    correct: "Correct! Earth is known as the Blue Planet because of its vast oceans.",
                    incorrect: "Oops! While Earth is indeed colorful, it's most commonly referred to as the Blue Planet because of its predominantly blue appearance from space."
                }
            },
            {
                question: "What percentage of Earth's surface is covered by water?",
                answers: [
                    { text: "50%", correct: false },
                    { text: "71%", correct: true },
                    { text: "30%", correct: false },
                    { text: "90%", correct: false }
                ],
                feedback: {
                    correct: "Correct! About 71% of Earth's surface is covered in water.",
                    incorrect: "Whoops! Earth's surface is actually about 71% water."
                }
            },
            {
                question: "What causes Earth's day and night cycle?",
                answers: [
                    { text: "The Moon's rotation", correct: false },
                    { text: "Earth's orbit around the Sun", correct: false },
                    { text: "Earth's magnetic field", correct: false },
                    { text: "Earth's axis rotation", correct: true }
                ],
                feedback: {
                    correct: "Correct! Earth's day and night cycle is caused by its rotation on its axis.",
                    incorrect: "Not quite! Earth's day and night cycle is caused by its rotation on its axis, like a spinning top."
                }
            },
            {
                question: "What gives Earth its changing seasons?",
                answers: [
                    { text: "The tilt of Earth's axis", correct: true },
                    { text: "Earth's distance from the Sun", correct: false },
                    { text: "The Moon's orbit", correct: false },
                    { text: "Earth's magnetic field", correct: false }
                ],
                feedback: {
                    correct: "Correct! Earth's changing seasons are caused by the tilt of its axis.",
                    incorrect: "Close, but not quite! Earth's changing seasons are actually caused by the tilt of its axis as it orbits the Sun."
                }
            },
            {
                question: "Which natural feature helps protect Earth from harmful space objects?",
                answers: [
                    { text: "Mountains", correct: false },
                    { text: "Atmosphere", correct: true },
                    { text: "Deserts", correct: false },
                    { text: "Forests", correct: false }
                ],
                feedback: {
                    correct: "Correct! Earth's atmosphere acts as a protective shield against meteors and other space debris.",
                    incorrect: "Oops! While mountains, deserts, and forests are important, it's the atmosphere that protects us from harmful space objects."
                }
            },
            {
                question: "What is the continuous movement of water on Earth called?",
                answers: [
                    { text: "Ocean dance", correct: false },
                    { text: "Water swirl", correct: false },
                    { text: "Water cycle", correct: true },
                    { text: "Aqua flow", correct: false }
                ],
                feedback: {
                    correct: "Correct! The continuous movement of water on Earth is called the water cycle.",
                    incorrect: "Not quite! The continuous movement of water on Earth, involving evaporation, condensation, and precipitation, is known as the water cycle."
                }
            }
        ];
