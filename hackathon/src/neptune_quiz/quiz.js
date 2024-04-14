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
        question: "What causes Neptune’s blue color?",
        answers: [
          { text: "Large oceans of water", correct: false },
          { text: "Methane in the atmosphere", correct: true },
          { text: "Reflection from Earth", correct: false },
          { text: "Blue sand", correct: false }
        ],
        correctFeedback: "Exactly right! Neptune’s beautiful blue color is caused by methane gas in its atmosphere that absorbs red light and reflects blue light.",
        incorrectFeedback: "Nice try! Neptune looks blue because of the methane gas in its atmosphere."
      },
      {
        question: "How fast are the winds on Neptune?",
        answers: [
          { text: "500 miles per hour", correct: false },
          { text: "800 miles per hour", correct: false },
          { text: "1,200 miles per hour", correct: true },
          { text: "100 miles per hour", correct: false }
        ],
        correctFeedback: "That’s right! Neptune has super fast winds that can reach speeds of over 1,200 miles per hour.",
        incorrectFeedback: "Not quite! The winds on Neptune can reach speeds of up to 1,200 miles per hour."
      },
      {
        question: "What type of giant is Neptune classified as?",
        answers: [
          { text: "Gas giant", correct: false },
          { text: "Rock giant", correct: false },
          { text: "Ice giant", correct: true },
          { text: "Storm giant", correct: false }
        ],
        correctFeedback: "Correct! Neptune is classified as an ice giant because of its composition, which includes water, ammonia, and methane ice.",
        incorrectFeedback: "Good guess, but Neptune is an ice giant because of the icy materials in its makeup."
      },
      {
        question: "Which moon orbits Neptune in the opposite direction of most other moons?",
        answers: [
          { text: "Europa", correct: false },
          { text: "Titan", correct: false },
          { text: "Ganymede", correct: false },
          { text: "Triton", correct: true }
        ],
        correctFeedback: "Excellent! Triton is unique because it orbits Neptune in the opposite direction of most other moons.",
        incorrectFeedback: "Almost there! Triton is known for its retrograde orbit around Neptune."
      },
      {
        question: "How long does it take for Neptune to orbit the Sun once?",
        answers: [
          { text: "75 Earth years", correct: false },
          { text: "165 Earth years", correct: true },
          { text: "200 Earth years", correct: false },
          { text: "100 Earth years", correct: false }
        ],
        correctFeedback: "That’s right! Neptune takes about 165 Earth years to complete one orbit around the Sun.",
        incorrectFeedback: "Not quite! Neptune orbits the Sun once every 165 Earth years."
      },
      {
        question: "What feature is similar to Jupiter’s Great Red Spot?",
        answers: [
          { text: "Great Blue Hole", correct: false },
          { text: "Great Dark Spot", correct: true },
          { text: "Great White Storm", correct: false },
          { text: "Great Thunder Storm", correct: false }
        ],
        correctFeedback: "Correct! Neptune has a similar feature called the Great Dark Spot, which is a giant storm.",
        incorrectFeedback: "Close, but the correct answer is the Great Dark Spot, a massive storm on Neptune."
      },
      {
        question: "What is remarkable about Neptune’s temperature?",
        answers: [
          { text: "It's the hottest planet", correct: false },
          { text: "It's the coldest planet", correct: true },
          { text: "It has moderate temperatures", correct: false },
          { text: "It has fluctuating temperatures", correct: false }
        ],
        correctFeedback: "Exactly! Neptune is one of the coldest planets in our solar system, with temperatures dropping extremely low.",
        incorrectFeedback: "Good try, but Neptune is known for being very cold."
      }
    ];
