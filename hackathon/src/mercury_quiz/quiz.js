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
                question: "What is the duration of a day on Mercury?",
                answers: [
                    { text: "88 days", correct: false },
                    { text: "24 hours", correct: false },
                    { text: "59 Earth days", correct: true },
                    { text: "30 days", correct: false }
                ],
                feedback: {
                    correct: "Correct! A day on Mercury lasts 59 Earth days due to its slow rotation.",
                    incorrect: "Not quite! A day on Mercury actually lasts 59 Earth days because of its slow rotation, not 88 days, 24 hours, or 30 days."
                }
            },
            {
                question: "What is Mercury's surface primarily characterized by?",
                answers: [
                    { text: "Smooth plains", correct: false },
                    { text: "Oceans", correct: false },
                    { text: "Thick forests", correct: false },
                    { text: "Craters", correct: true }
                ],
                feedback: {
                    correct: "Exactly! Mercury's surface is covered in craters due to many impacts over time.",
                    incorrect: "Close, but not quite! Mercury's surface is primarily characterized by craters, not smooth plains, oceans, or forests."
                }
            },
            {
                question: "Which planet is the closest to the Sun?",
                answers: [
                    { text: "Venus", correct: false },
                    { text: "Mars", correct: false },
                    { text: "Mercury", correct: true },
                    { text: "Earth", correct: false }
                ],
                feedback: {
                    correct: "Correct! Mercury is the closest planet to the Sun.",
                    incorrect: "Not correct. The closest planet to the Sun is Mercury, not Venus, Mars, or Earth."
                }
            },
            {
                question: "How long does it take Mercury to complete one orbit around the Sun?",
                answers: [
                    { text: "365 days", correct: false },
                    { text: "88 days", correct: true },
                    { text: "225 days", correct: false },
                    { text: "1 day", correct: false }
                ],
                feedback: {
                    correct: "Right on! Mercury completes an orbit around the Sun in just 88 Earth days.",
                    incorrect: "Almost! Mercury actually completes its orbit around the Sun in just 88 days, not 365 days, 225 days, or in 1 day."
                }
            },
            {
                question: "What significant feature does Mercury have, similar to Earth?",
                answers: [
                    { text: "Large oceans", correct: false },
                    { text: "Dense atmosphere", correct: false },
                    { text: "Magnetic field", correct: true },
                    { text: "Ring system", correct: false }
                ],
                feedback: {
                    correct: "Correct! Despite its small size, Mercury has a magnetic field, much like Earth.",
                    incorrect: "Incorrect. Mercury's significant Earth-like feature is its magnetic field, not large oceans, a dense atmosphere, or a ring system."
                }
            },
            {
                question: "Why can't you breathe on Mercury?",
                answers: [
                    { text: "It has a very thin atmosphere.", correct: true },
                    { text: "It’s too hot.", correct: false },
                    { text: "There’s too much oxygen.", correct: false },
                    { text: "It’s fully underwater.", correct: false }
                ],
                feedback: {
                    correct: "Exactly! Mercury has a very thin atmosphere, making it impossible to breathe there.",
                    incorrect: "Not quite right. You can't breathe on Mercury because it has a very thin atmosphere, not because it's too hot or underwater."
                }
            },
            {
                question: "How does the Sun appear when viewed from Mercury compared to Earth?",
                answers: [
                    { text: "About the same size", correct: false },
                    { text: "Smaller", correct: false },
                    { text: "Three times larger", correct: true },
                    { text: "Invisible", correct: false }
                ],
                feedback: {
                    correct: "Correct! From Mercury, the Sun appears three times larger than it does from Earth due to Mercury's proximity to the Sun.",
                    incorrect: "Incorrect. From Mercury, the Sun appears three times larger than from Earth, not the same size, smaller, or invisible."
                }
            },
            {
                question: "What does the sky look like on Mercury during the day?",
                answers: [
                    { text: "Blue and clear", correct: false },
                    { text: "Green and cloudy", correct: false },
                    { text: "Red and dusty", correct: false },
                    { text: "Black", correct: true }
                ],
                feedback: {
                    correct: "That’s right! The sky on Mercury appears black during the day because the planet has virtually no atmosphere to scatter sunlight.",
                    incorrect: "Not quite! The sky on Mercury is black during the day because there is no significant atmosphere to scatter the sunlight, not blue, green, or red."
                }
            }
        ];
