import { useEffect, useState } from "react";
import { Requests } from "./api";
import { TriviaQuestion } from "./api";

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(15);
  const [score, setScore] = useState(0);
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

  const handleAnswerSelection = (selectedAnswer: string) => {
    // Update the user's selected answer for the current question
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === questionIndex ? { ...question, userSelectedAnswer: selectedAnswer } : question
      )
    );
  };

  const handleCheckAnswer = () => {
    // Check if the selected answer is correct and update the score
    const selectedAnswer = questions[questionIndex].userSelectedAnswer;
    const correctAnswer = questions[questionIndex].correct_answer;
    console.log(selectedAnswer, correctAnswer);

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore: number) => prevScore + 1);
    }

    // Move to the next question if available
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <div>
        {questions.length > 0 && questionIndex < questions.length && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: questions[questionIndex].question }} />
            <div>
              {[...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer].map(
                (answer, answerIndex) => (
                  <button
                    key={answerIndex}
                    onClick={() => handleAnswerSelection(answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                )
              )}
            </div>
          </div>
        )}
        <p>Current Score: {score} </p>
        <button onClick={() => {
          handleCheckAnswer();
        }} disabled={questionIndex === questions.length - 1}>
          Next Question
        </button>
      </div>
    </>
  );
}

export default App;
