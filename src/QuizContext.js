import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizId, setQuizId] = useState('');

    const saveQuizId = (id) => {
        setQuizId(id);
    };

    return (
        <QuizContext.Provider value={{ quizId, saveQuizId }}>
            {children}
        </QuizContext.Provider>
    );
};
