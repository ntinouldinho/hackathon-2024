import { useEffect, useState } from "react";
import importedQuestions from "./questions.json";
import './QuizStyles.css';

export const Quiz = ({ planet, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (planet) {
      const shuffledQuestions = [...importedQuestions[planet]].sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(shuffledQuestions[0]);
    }
  }, [planet]);

  const startGame = () => {
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    // Determine the feedback text based on the answer's correctness and the question's feedback structure
    let feedbackMessage;
    if (currentQuestion.feedback) {
      // Handling feedback structure with nested correct and incorrect keys
      feedbackMessage = answer.correct ? currentQuestion.feedback.correct : currentQuestion.feedback.incorrect;
    } else {
      // Handling separate feedback keys (fallback)
      feedbackMessage = answer.correct ? currentQuestion.correctFeedback : currentQuestion.incorrectFeedback;
    }

    // Set feedback text if available, otherwise use a fallback message
    setFeedbackText(feedbackMessage || "No feedback available.");

    setTimeout(() => {
      setShowFeedback(false);
      if (answer.correct) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
          setCurrentQuestion(questions[nextQuestionIndex]);
          setSelectedAnswer(null); // Reset selected answer for the next question
        } else {
          setQuizCompleted(true); // Set quiz as completed when there are no more questions
        }
      } else {
        setSelectedAnswer(null); // Reset selected answer to allow for retry if the answer was incorrect
      }
    }, 2000); // Delay for showing feedback
  };

  return (
    <div className="container">
      {!quizCompleted ? (
        <>
          {currentQuestion && (
            <div>
              <div id="question">{currentQuestion.question}</div>
              <div id="answer-buttons" className="btn-grid">
                {currentQuestion.answers.map((answer, index) => (
                  <button key={index}
                          className={`btn ${selectedAnswer === answer ? (answer.correct ? 'correct' : 'wrong') : ''}`}
                          onClick={() => handleAnswer(answer)}
                          disabled={showFeedback || selectedAnswer}>
                    {answer.text}
                  </button>
                ))}
              </div>
              {showFeedback && <div className="feedback">{feedbackText}</div>}
            </div>
          )}
          {!currentQuestion && (
            <button className="start-btn btn" onClick={startGame}>Start Quiz</button>
          )}
        </>
      ) : (
        <div className="quiz-completion">
          <p>You have successfully completed this quiz!</p>
          <button className="start-btn btn" onClick={onClose}>Exit</button>
        </div>
      )}
    </div>
  );
};
