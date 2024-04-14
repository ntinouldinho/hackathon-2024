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
        question: "Why does Uranus spin on its side?",
        answers: [
          { text: "It was born that way", correct: false },
          { text: "It collided with another planet", correct: true },
          { text: "It's trying to be different", correct: false },
          { text: "It was shaped like a ball", correct: false }
        ],
        correctFeedback: "Exactly right! Scientists believe Uranus spins on its side because it might have collided with another planet long ago.",
        incorrectFeedback: "Nice try! The most accepted theory is that Uranus spins on its side due to a collision with another planet in the past."
      },
      {
        question: "What is the temperature like on Uranus?",
        answers: [
          { text: "Hot like the sun", correct: false },
          { text: "Warm like a spring day", correct: false },
          { text: "Cold like a freezer", correct: true },
          { text: "Cool like a fall evening", correct: false }
        ],
        correctFeedback: "Correct! Uranus is extremely cold, with temperatures dropping below -350 degrees Fahrenheit.",
        incorrectFeedback: "Not quite! Uranus is actually one of the coldest planets in our solar system, much colder than a freezer!"
      },
      {
        question: "What color is Uranus?",
        answers: [
          { text: "Red", correct: false },
          { text: "Blue", correct: true },
          { text: "Yellow", correct: false },
          { text: "Green", correct: false }
        ],
        correctFeedback: "That’s right! Uranus appears blue because of the methane in its atmosphere that absorbs red light and scatters blue light.",
        incorrectFeedback: "Good guess, but Uranus is actually blue due to the methane gas in its atmosphere."
      },
      {
        question: "How many moons does Uranus have?",
        answers: [
          { text: "5", correct: false },
          { text: "27", correct: true },
          { text: "10", correct: false },
          { text: "50", correct: false }
        ],
        correctFeedback: "Excellent! Uranus has 27 known moons that we’ve discovered so far.",
        incorrectFeedback: "Close, but Uranus actually has 27 known moons."
      },
      {
        question: "What type of giant is Uranus considered?",
        answers: [
          { text: "Rock giant", correct: false },
          { text: "Gas giant", correct: false },
          { text: "Ice giant", correct: true },
          { text: "Fire giant", correct: false }
        ],
        correctFeedback: "Correct! Uranus is classified as an ice giant because it has more 'ices' like water, ammonia, and methane.",
        incorrectFeedback: "Almost! Uranus is actually classified as an ice giant because of its composition, which includes icy materials like water, ammonia, and methane."
      },
      {
        question: "What makes Uranus's rings different from Saturn's?",
        answers: [
          { text: "They are colorful", correct: false },
          { text: "They are completely invisible", correct: false },
          { text: "They are brighter and thicker", correct: false },
          { text: "They are darker and thinner", correct: true }
        ],
        correctFeedback: "That’s right! Uranus’s rings are much darker and thinner compared to Saturn's bright and thick rings.",
        incorrectFeedback: "Not quite! Uranus’s rings are actually darker and thinner than Saturn’s, which are bright and thick."
      },
      {
        question: "What unique seasonal change does Uranus experience?",
        answers: [
          { text: "It has no seasons", correct: false },
          { text: "Each season lasts about 42 years", correct: true },
          { text: "It has only one season", correct: false },
          { text: "Seasons change every month", correct: false }
        ],
        correctFeedback: "Exactly! Because of its tilted axis, each season on Uranus lasts about 42 years.",
        incorrectFeedback: "Good try! Due to its extreme tilt, each season on Uranus actually lasts about 42 years."
      }
    ];
