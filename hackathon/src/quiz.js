import { useEffect, useState } from "react";
import importedQuestions from "./questions.json"; // Rename to avoid shadowing
import './QuizStyles.css'; // Adjust the path as necessary

export const Quiz = ({ planet }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionContainer, setShowQuestionContainer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  console.log(importedQuestions, planet)
  useEffect(() => {
    if (planet) {
        console.log(importedQuestions, planet)
      setQuestions(importedQuestions[planet].sort(() => Math.random() - 0.5));
    }
  }, []);

  useEffect(() => {
    console.log(questions)
  }, [questions]);

  function startGame() {
    setShowStartButton(false);
    setShowQuestionContainer(true);
    setCurrentQuestionIndex(0);
    setNextQuestion();
  }

  function setNextQuestion() {
    setCurrentQuestion(questions[currentQuestionIndex]);
  }

  function selectAnswer(answer) {
    const correct = answer.correct;
    setFeedbackText(correct ? currentQuestion.correctFeedback : currentQuestion.incorrectFeedback);
    setShowFeedback(true);

    if (correct) {
      if (questions.length > currentQuestionIndex + 1) {
        setShowNextButton(true);
      } else {
        setShowStartButton(true);
      }
    } else {
      setTimeout(() => {
        setFeedbackText('');
        setShowFeedback(false);
        setCurrentQuestion(questions[currentQuestionIndex]); // Allow retry for the same question
      }, 2000); // Show incorrect feedback for 2 seconds before retry
    }
  }

  return (
    <div className="container">
      {showQuestionContainer && (
        <div id="question-container">
          <div id="question">{currentQuestion?.question}</div>
          <div id="answer-buttons">
            {currentQuestion?.answers.map((answer, index) => (
              <button key={index} className="btn" onClick={() => selectAnswer(answer)}>
                {answer.text}
              </button>
            ))}
          </div>
          {showFeedback && <div className="feedback">{feedbackText}</div>}
        </div>
      )}
      <div className="controls">
        {showStartButton && (
          <button id="start-btn" className="start-btn btn" onClick={startGame}>
            Start
          </button>
        )}
        {showNextButton && (
          <button id="next-btn" className="next-btn btn" onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setNextQuestion();
            setShowNextButton(false);
          }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
