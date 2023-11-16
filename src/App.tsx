import { useEffect, useState } from "react";
import { Requests } from "./api";
import { TriviaQuestion } from "./api";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(15);
  const [difficulty, setDifficulty] = useState("easy");
  const [questionType, setQuestionType] = useState("multiple");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  useEffect(() => {
    Requests.getQuestions(questionLimit, difficulty, questionType)
      .then((questions) => {
        console.log(questions);
        setQuestions(questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        // Handle or log the error appropriately in your application
      });
  }, []);

  return (
    <>
      <div>
        <p>hello World</p>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <ul>
              {[...question.incorrect_answers, question.correct_answer].map(
                (answer, answerIndex) => (
                  <li key={answerIndex}>{answer}</li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
