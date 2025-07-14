/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// Create context
const AnswerContext = createContext();

// Create provider
const AnswerProvider = ({ children }) => {
  const [answerResponse, setAnswerResponse] = useState(null);
  const[quiz,setQuiz]=useState('')
  return (
    <AnswerContext.Provider value={{ answerResponse, setAnswerResponse,quiz,setQuiz }}>
      {children}
    </AnswerContext.Provider>
  );
};

// Custom hook to use the context
export const useAnswer = () => useContext(AnswerContext);

export default AnswerProvider;
