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
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

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

  const handleAnswerSelection = (selectedAnswer: string, answerIndex: number) => {
    // Update the user's selected answer for the current question
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === questionIndex
          ? { ...question, userSelectedAnswer: selectedAnswer }
          : question
      )
    );
    setSelectedAnswerIndex(answerIndex)
  };

  
  const calculateTimeBonus = () => {
    if (timer >= 5) {
      return 5;
    } else if (timer === 4) {
      return 4;
    } else if (timer === 3) {
      return 3
    } else if (timer === 2) {
      return 2
    } else  {
      return 1;
    }
  };

  const difficultyPoints = () => {
    const currentQuestion = questions[questionIndex];

    // Issue with curDifficulty trying to access questions before they are fetched from the API.
    if (!currentQuestion || !currentQuestion.difficulty) {
      console.error("Invalid question or difficulty is missing");
      return 0;
    }

    return calculatePoints(currentQuestion.difficulty);
  }

  const calculatePoints = (curDifficulty: string) => {
    if (curDifficulty === "easy") {
      return 3;
    } else if (curDifficulty === "medium") {
      return 4;
    } else if (curDifficulty === "hard") {
      return 5;
    }
    return 0;
  }

  const handleCheckAnswer = () => {
    // Check if the selected answer is correct and update the score
    const selectedAnswer = questions[questionIndex].userSelectedAnswer;
    const correctAnswer = questions[questionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
      const difficulty: number = difficultyPoints();
      setScore((prevScore: number) => prevScore + difficulty * calculateTimeBonus())
    }
    setSelectedAnswerIndex(null);
    // Move to the next question if available
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setTimer(10);
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
                  onClick={() => handleAnswerSelection(answer, answerIndex)}
                  className={selectedAnswerIndex === answerIndex ? "selectedAnswer" : ""}
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
          {!questions[questionIndex]?.userSelectedAnswer 
          ? `Time Left ${timer} Points: ${calculateTimeBonus() * difficultyPoints()}` 
          : `Next Question Points: ${calculateTimeBonus() * difficultyPoints()}`}
        </button>
      </div>
    </>
  );
}

export default GameFlow;
