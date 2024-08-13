import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import QuestionComponent from "./components/QuestionComponent";
import { fetchQuestion, Question } from "./services/api";
import "./App.css";

const App = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allowReload, setAllowReload] = useState<boolean>(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (!allowReload) {
  //       event.preventDefault();
  //       setShowModal(true);
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [allowReload]);

  const loadQuestion = async () => {
    setLoading(true);
    const newQuestion = await fetchQuestion();
    if (newQuestion) {
      setQuestion(newQuestion);
      setLoading(false);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [currentQuestion]);

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestion < 10) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 2000);
    } else {
      navigate("/results", { state: { correct: correctAnswers + (isCorrect ? 1 : 0), incorrect: incorrectAnswers + (isCorrect ? 0 : 1) } });
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Trivia Game</h1>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : question ? (
        <QuestionComponent question={question} onSubmit={handleAnswerSubmit} />
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default App;
