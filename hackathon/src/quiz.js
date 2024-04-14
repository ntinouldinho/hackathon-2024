import React, { useEffect, useState } from 'react';
import importedQuestions from './questions.json';
import './QuizStyles.css';

export const Quiz = ({ planet }) => {
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
      setCurrentQuestion(shuffledQuestions[0]); // Pre-load the first question
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
    setFeedbackText(answer.correct ? currentQuestion.feedback.correct : currentQuestion.feedback.incorrect);

    setTimeout(() => {
      setShowFeedback(false);
      if (answer.correct) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
          setCurrentQuestion(questions[nextQuestionIndex]);
          setSelectedAnswer(null);
        } else {
          setQuizCompleted(true);
        }
      } else {
        setSelectedAnswer(null); // Allow retry for the current question
      }
    }, 2000); // Delay for showing feedback
  };

  return (
    <div className="container">
      {quizCompleted ? (
        <div className="quiz-completion">
          <p>You have successfully completed this quiz!</p>
          {/* No actions or buttons shown, just the message */}
        </div>
      ) : (
        <>
          {currentQuestion && (
            <div>
              <div id="question">{currentQuestion.question}</div>
              <div id="answer-buttons" className="btn-grid">
                {currentQuestion.answers.map((answer, index) => (
                  <button key={index}
                          className={`btn ${selectedAnswer === answer ? (answer.correct ? 'correct' : 'wrong') : ''}`}
                          onClick={() => handleAnswer(answer)}
                          disabled={showFeedback}>
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
      )}
    </div>
  );
};
