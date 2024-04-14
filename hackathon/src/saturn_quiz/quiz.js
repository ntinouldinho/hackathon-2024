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
        question: "What are Saturn's rings made of?",
        answers: [
          { text: "Clouds", correct: false },
          { text: "Ice and rocks", correct: true },
          { text: "Liquid water", correct: false },
          { text: "Pure gold", correct: false }
        ],
        correctFeedback: "Exactly right! Saturn's rings are made of millions of ice particles and rocks that orbit around the planet.",
        incorrectFeedback: "Nice try! The rings are actually made of ice and rocks, not clouds, liquid water, or gold."
      },
      {
        question: "How long does one day last on Saturn?",
        answers: [
          { text: "About 24 hours", correct: false },
          { text: "About 12 hours", correct: false },
          { text: "About 10 and a half hours", correct: true },
          { text: "About 30 hours", correct: false }
        ],
        correctFeedback: "Correct! A day on Saturn only lasts about 10 and a half hours because it spins so quickly.",
        incorrectFeedback: "Almost! A day on Saturn is much shorter, only about 10 and a half hours long."
      },
      {
        question: "Which of Saturn's moons is the largest?",
        answers: [
          { text: "Enceladus", correct: false },
          { text: "Mimas", correct: false },
          { text: "Titan", correct: true },
          { text: "Iapetus", correct: false }
        ],
        correctFeedback: "That’s right! Titan is not only Saturn’s largest moon but also has its own atmosphere, which is very unusual for a moon.",
        incorrectFeedback: "Not quite! The largest moon of Saturn is Titan, which is even bigger than the planet Mercury."
      },
      {
        question: "What unusual shape is the storm on Saturn’s north pole?",
        answers: [
          { text: "Circle", correct: false },
          { text: "Triangle", correct: false },
          { text: "Hexagon", correct: true },
          { text: "Square", correct: false }
        ],
        correctFeedback: "Exactly! The storm at Saturn’s north pole is a hexagon, which is a six-sided shape.",
        incorrectFeedback: "Good guess, but the storm is actually shaped like a hexagon, a six-sided figure."
      },
      {
        question: "How fast can winds on Saturn get?",
        answers: [
          { text: "Up to 500 miles per hour", correct: false },
          { text: "Up to 1,100 miles per hour", correct: true },
          { text: "Up to 300 miles per hour", correct: false },
          { text: "Up to 100 miles per hour", correct: false }
        ],
        correctFeedback: "Correct! Winds on Saturn can be super fast, reaching speeds of up to 1,100 miles per hour.",
        incorrectFeedback: "Not quite! Winds on Saturn are among the fastest in the solar system, reaching speeds of up to 1,100 miles per hour."
      },
      {
        question: "How long is one season on Saturn?",
        answers: [
          { text: "About 7 years", correct: true },
          { text: "About 1 year", correct: false },
          { text: "About 3 years", correct: false },
          { text: "About 5 years", correct: false }
        ],
        correctFeedback: "That’s right! Each season on Saturn lasts about seven Earth years because it takes Saturn almost 30 years to orbit the Sun.",
        incorrectFeedback: "Close, but actually, each season on Saturn lasts about seven years due to its long orbital period around the Sun."
      },
      {
        question: "What did the Cassini spacecraft do?",
        answers: [
          { text: "Landed on Saturn", correct: false },
          { text: "Explored Saturn's moons", correct: true },
          { text: "Took the first pictures of Mars", correct: false },
          { text: "Flew into the Sun", correct: false }
        ],
        correctFeedback: "Excellent! The Cassini spacecraft spent years exploring Saturn and its moons, giving us incredible data and pictures.",
        incorrectFeedback: "Not quite! The Cassini spacecraft was famous for exploring Saturn and its moons, not landing on Saturn or taking pictures of Mars."
      }
    ];
