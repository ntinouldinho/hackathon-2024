// QuizModal.jsx

import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./index.css"; // Import your CSS module

function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const checkAnswer = () => {
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedAnswer) {
      const answer = selectedAnswer.value;
      if (answer === "b") {
        alert("Correct!");
      } else {
        alert("Incorrect. Try again!");
      }
    } else {
      alert("Please select an answer.");
    }
  };

  return (
    <div>
      <button onClick={openModal}>Open Quiz</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles["quiz-modal"]}
        overlayClassName={styles["quiz-overlay"]}
      >
        <div className={styles["quiz-container"]}>
          <div className={styles["quiz-question"]}>
            Which planet is known as the Red Planet?
          </div>
          <div className={styles["quiz-choice"]}>
            <input type="radio" name="answer" value="a" id="choice-a" />
            <label htmlFor="choice-a">A) Venus</label>
          </div>
          <div className={styles["quiz-choice"]}>
            <input type="radio" name="answer" value="b" id="choice-b" />
            <label htmlFor="choice-b">B) Mars</label>
          </div>
          <div className={styles["quiz-choice"]}>
            <input type="radio" name="answer" value="c" id="choice-c" />
            <label htmlFor="choice-c">C) Jupiter</label>
          </div>
          <button onClick={checkAnswer}>Submit</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default QuizModal;
