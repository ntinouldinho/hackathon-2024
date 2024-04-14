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
        question: "Why is Mars called the 'Red Planet'?",
        answers: [
          { text: "Because it's hot like fire", correct: false },
          { text: "Because its surface is covered in red rust", correct: true },
          { text: "Because it's angry", correct: false },
          { text: "Because it's the color of a rose", correct: false }
        ],
        correctFeedback: "Exactly right! Mars is called the 'Red Planet' because its surface has lots of iron oxide, or rust, which makes it look red.",
        incorrectFeedback: "Nice try! The correct answer is B, because Mars has lots of iron oxide, or rust, that makes its surface red."
      },
      {
        question: "How long is a day on Mars?",
        answers: [
          { text: "Just like Earth, 24 hours", correct: false },
          { text: "12 hours", correct: false },
          { text: "24 hours and 39 minutes", correct: true },
          { text: "30 hours", correct: false }
        ],
        correctFeedback: "Correct! A day on Mars is just a little longer than a day on Earth, lasting 24 hours and 39 minutes.",
        incorrectFeedback: "Almost! A day on Mars is actually 24 hours and 39 minutes long, a bit longer than a day on Earth."
      },
      {
        question: "What is the name of the tallest volcano on Mars?",
        answers: [
          { text: "Mauna Loa", correct: false },
          { text: "Mount Everest", correct: false },
          { text: "Olympus Mons", correct: true },
          { text: "Mount Fuji", correct: false }
        ],
        correctFeedback: "That’s right! Olympus Mons is the tallest volcano on Mars, and it's about three times the height of Mount Everest.",
        incorrectFeedback: "Not quite! The tallest volcano on Mars is Olympus Mons, not any of the Earth mountains."
      },
      {
        question: "What are the names of Mars' two moons?",
        answers: [
          { text: "Phobos and Deimos", correct: true },
          { text: "Castor and Pollux", correct: false },
          { text: "Titan and Rhea", correct: false },
          { text: "Luna and Selene", correct: false }
        ],
        correctFeedback: "Excellent! Mars has two small moons named Phobos and Deimos.",
        incorrectFeedback: "Good guess, but Mars' moons are actually called Phobos and Deimos."
      },
      {
        question: "What kind of robots currently explore Mars?",
        answers: [
          { text: "Transformers", correct: false },
          { text: "Drones", correct: false },
          { text: "Rovers", correct: true },
          { text: "Androids", correct: false }
        ],
        correctFeedback: "That’s correct! Rovers are the robots exploring Mars, helping us learn more about the planet.",
        incorrectFeedback: "Not quite! The robots currently exploring Mars are called rovers, not drones, transformers, or androids."
      }
    ];
