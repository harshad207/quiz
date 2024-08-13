import React, { useState } from "react";
import "../index.css";

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Props {
  question: Question;
  onSubmit: (correct: boolean) => void;
}

const QuestionComponent: React.FC<Props> = ({ question, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [optionsDisabled, setOptionsDisabled] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setValidationMessage("Please select an answer before submitting.");
    } else {
      const isCorrect = selectedAnswer === question.correct_answer;
      setOptionsDisabled(true);
      if (!isCorrect) {
        setShowCorrectAnswer(true);
        setTimeout(() => {
          onSubmit(false);
        }, 2000);
      } else {
        onSubmit(true);
      }
      setValidationMessage(null);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="question-container">
      <h2 className="question">{question.question}</h2>
      <ul className="answer-list">
        {[...question.incorrect_answers, question.correct_answer].sort().map((answer) => (
          <li key={answer} className="answer-item">
            <label>
              <input
                type="radio"
                name="answer"
                value={answer}
                onChange={() => setSelectedAnswer(answer)}
                className="answer-radio"
                disabled={optionsDisabled}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
      <button onClick={handleSubmit} className="submit-button" disabled={optionsDisabled}>
        Submit
      </button>
      {showCorrectAnswer && (
        <p className="correct-answer">
          The correct answer is: <strong>{question.correct_answer}</strong>.
        </p>
      )}
    </div>
  );
};

export default QuestionComponent;
