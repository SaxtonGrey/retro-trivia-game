import { useEffect, useState } from "react";
import { Requests } from "../api";
import { TriviaQuestion } from "../api";
import "../App.css";

function GameFlow() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(15);
  const [difficulty, setDifficulty] = useState("mixed");
  const [questionType, setQuestionType] = useState("multiple");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    Requests.getQuestions(questionLimit, difficulty, questionType)
      .then((questions) => {
        setQuestions(questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        // Handle or log the error appropriately in your application
      });
  }, []);

  useEffect(() => {
    let timerId: number;
    if (timer > 0) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => window.clearInterval(timerId);
  }, [timer]);

  const handleAnswerSelection = (selectedAnswer: string) => {
    // Update the user's selected answer for the current question
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === questionIndex
          ? { ...question, userSelectedAnswer: selectedAnswer }
          : question
      )
    );
  };

  // We can only do 50 questions so lets make the multiplier double the points
  // if the answer is submitted before the timer is up; max score will be 100
  const calculateMultiplier = () => {
    const quickMultiplier: number = 5;
    const calculatedMultiplier: number = timer / 8;
    const baseMultiplier: number = 1;
    if (timer > 8) {
      return quickMultiplier;
    } else if (timer < 8 && timer > 1.6) {
      return calculatedMultiplier * quickMultiplier;
    } else {
      return baseMultiplier;
    }
  };

  const handleCheckAnswer = () => {
    // Check if the selected answer is correct and update the score
    const selectedAnswer = questions[questionIndex].userSelectedAnswer;
    const correctAnswer = questions[questionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
      const curDifficulty: string = questions[questionIndex].difficulty;
      if (curDifficulty === "easy") {
        setScore((prevScore: number) => prevScore + 1 * calculateMultiplier());
      }
      if (curDifficulty === "medium") {
        setScore(
          (prevScore: number) => prevScore + 1.5 * calculateMultiplier()
        );
      }
      if (curDifficulty === "hard") {
        setScore((prevScore: number) => prevScore + 2 * calculateMultiplier());
      }
    }
    setTimer(10);
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
            <p
              dangerouslySetInnerHTML={{
                __html: questions[questionIndex].question,
              }}
            />
            <div>
              {[
                ...questions[questionIndex].incorrect_answers,
                questions[questionIndex].correct_answer,
              ].map((answer, answerIndex) => (
                <button
                  key={answerIndex}
                  onClick={() => handleAnswerSelection(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </div>
          </div>
        )}
        <p>Current Score: {score} </p>
        <button
          onClick={() => {
            handleCheckAnswer();
          }}
          disabled={
            questionIndex === questions.length - 1 ||
            !questions[questionIndex]?.userSelectedAnswer
          }
        >
          Next Question
        </button>
      </div>
    </>
  );
}

export default GameFlow;
