// src/services/api.ts
import axios from "axios";

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export const fetchQuestion = async (): Promise<Question | null> => {
    try {
        const response = await axios.get("https://opentdb.com/api.php?amount=1");
        const data = response.data;

        if (data.response_code === 0 && data.results.length > 0) {
            return data.results[0];
        } else if (data.response_code === 5) {
            console.error("API returned response_code 5: No questions found.");
            return null;
        } else {
            console.error("Unexpected API response:", data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching question:", error);
        return null;
    }
};
