// src/components/ResultsWrapper.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultsComponent from "./ResultsComponent";

const ResultsWrapper: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as { correct: number; incorrect: number } | undefined;

    if (!state) {
        navigate("/", { replace: true });
        return null;
    }

    const { correct, incorrect } = state;

    return <ResultsComponent correct={correct} incorrect={incorrect} />;
};

export default ResultsWrapper;
