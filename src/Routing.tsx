import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import App from "./App";
import ResultsComponent from "./components/ResultsComponent";

const ResultsWrapper = () => {
    const location = useLocation();
    const { correct, incorrect } = location.state || { correct: 0, incorrect: 0 };

    return <ResultsComponent correct={correct} incorrect={incorrect} />;
};

const Routing = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/results" element={<ResultsWrapper />} />
        </Routes>
    </Router>
);

export default Routing;
