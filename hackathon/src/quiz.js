import { useEffect, useState } from "react";
import importedQuestions from "./questions.json"; // Ensure the path to questions.json is correct
import './QuizStyles.css'; // Ensure the path to QuizStyles.css is correct

export const Quiz = ({ planet }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showStartButton, setShowStartButton] = useState(true);
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
    setShowStartButton(false);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setSelectedAnswer(null);
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
          setShowStartButton(true);
        }
      } else {
        // Clear selected answer to allow retry
        setSelectedAnswer(null);
      }
    }, 2000); // Delay before clearing feedback or moving to the next question
  };

  return (
    <div className="container">
      {showStartButton && !quizCompleted && (
        <button className="start-btn btn" onClick={startGame}>Start Quiz</button>
      )}
      {!showStartButton && currentQuestion && !quizCompleted && (
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
      {quizCompleted && (
        <div>
          <div className="feedback">You have successfully completed this quiz!</div>
          <button className="start-btn btn" onClick={() => setQuizCompleted(false)}>Exit</button>
        </div>
      )}
    </div>
  );
};
