import { useEffect, useState } from "react";
import { Requests } from "../api";
import { TriviaQuestion } from "../types/interfaces";

const TIME_BONUS_THRESHOLD = 5;
const MAX_TIMER = 10;

function GameFlow() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(15);
  const [difficulty, setDifficulty] = useState("mixed");
  const [questionType, setQuestionType] = useState("multiple");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [timer, setTimer] = useState(MAX_TIMER);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    Requests.getQuestions(questionLimit, difficulty, questionType)
      .then((fetchedQuestions) => {
        setQuestions(fetchedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        // Handle or log the error appropriately in your application
      });
  }, [questionLimit, difficulty, questionType]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timer > 0) {
      timerId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [timer]);

  const handleAnswerSelection = (
    selectedAnswer: string,
    answerIndex: number
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === questionIndex
          ? { ...question, userSelectedAnswer: selectedAnswer }
          : question
      )
    );
    setSelectedAnswerIndex(answerIndex);
  };

  const calculateTimeBonus = () => {
    return timer > 0 ? Math.min(timer, TIME_BONUS_THRESHOLD) : 0;
  };

  const difficultyPoints = () => {
    const currentQuestion = questions[questionIndex];

    if (!currentQuestion || !currentQuestion.difficulty) {
      console.error("Invalid question or difficulty is missing");
      return 0;
    }

    return calculatePoints(currentQuestion.difficulty);
  };

  const calculatePoints = (curDifficulty: string) => {
    switch (curDifficulty) {
      case "easy":
        return 3;
      case "medium":
        return 4;
      case "hard":
        return 5;
      default:
        return 0;
    }
  };

  const handleCheckAnswer = () => {
    const currentQuestion = questions[questionIndex];

    if (!currentQuestion || !currentQuestion.userSelectedAnswer) {
      return;
    }

    const { userSelectedAnswer, correct_answer } = currentQuestion;

    if (userSelectedAnswer === correct_answer) {
      const difficulty = difficultyPoints();
      setScore((prevScore) => prevScore + difficulty * calculateTimeBonus());
    }

    setSelectedAnswerIndex(null);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }

    setTimer(MAX_TIMER);
  };

  if (questions.length === 0 || questionIndex >= questions.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: questions[questionIndex].question }}
      />
      <div>
        {[
          ...questions[questionIndex].incorrect_answers,
          questions[questionIndex].correct_answer,
        ].map((answer, answerIndex) => (
          <button
            key={answerIndex}
            onClick={() => handleAnswerSelection(answer, answerIndex)}
            className={
              selectedAnswerIndex === answerIndex ? "selectedAnswer" : ""
            }
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      <p>Current Score: {score} </p>
      <button
        onClick={handleCheckAnswer}
        disabled={!questions[questionIndex].userSelectedAnswer}
      >
        {!questions[questionIndex].userSelectedAnswer
          ? `Time Left ${timer} Points: ${
              calculateTimeBonus() * difficultyPoints()
            }`
          : `Next Question Points: ${
              calculateTimeBonus() * difficultyPoints()
            }`}
      </button>
    </div>
  );
}

export default GameFlow;
