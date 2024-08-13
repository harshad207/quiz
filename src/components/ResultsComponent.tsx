import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

interface Props {
    correct: number;
    incorrect: number;
}

const ResultsComponent: React.FC<Props> = ({ correct, incorrect }) => {
    const navigate = useNavigate();
    return (
        <div className="results-container">
            <h2>Results</h2>
            <p>Total Questions Served: 10</p>
            <p className="result-correct">Total Correct: {correct}</p>
            <p className="result-incorrect">Total Incorrect: {incorrect}</p>
            <button onClick={() => navigate("/")}>
                Restart Game
            </button>
        </div>
    );
};

export default ResultsComponent;
