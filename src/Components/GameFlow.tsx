import { useEffect, useState } from "react";
import { Requests } from "../api";
import { TriviaQuestion } from "../types/interfaces";
import { LeaderBoard } from "./LeaderBoard/LeaderBoard";

const TIME_BONUS_THRESHOLD = 5;
const MAX_TIMER = 10;

function GameFlow() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionLimit, setQuestionLimit] = useState(15);
  const [difficulty, setDifficulty] = useState("mixed");
  const [questionType, setQuestionType] = useState("multiple");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [timer, setTimer] = useState(MAX_TIMER);
  const [isEnterKeyDown, setIsEnterKeyDown] = useState(false);
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

  useEffect(() => {
    console.log("lives after update", lives);
    if (lives === 0) {
      console.log("game over");
      // Here is where the game will end when you run out of lives link the leaderboards here
      // There are two locations where it is needed
    }
  }, [lives]);
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

  const handleCheckAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
  const isMouseClick = 'type' in e && e.type === 'click';
    if (isEnterKeyDown || isMouseClick) {
      setIsEnterKeyDown(false);
      const currentQuestion = questions[questionIndex];

      if (!currentQuestion || !currentQuestion.userSelectedAnswer) {
        return;
      }

      const { userSelectedAnswer, correct_answer } = currentQuestion;
      if (userSelectedAnswer === correct_answer) {
        const difficulty = difficultyPoints();
        setScore((prevScore) => prevScore + difficulty * calculateTimeBonus());
      } else {
        setLives((prevLives) => prevLives - 1);
      }
      setSelectedAnswerIndex(null);
      if (questionIndex < questions.length - 1 && lives !== 0) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        //Link leaderboards with a congradulations you win completed all 50 questions
      }
      setTimer(MAX_TIMER);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      setIsEnterKeyDown(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      setIsEnterKeyDown(false);
    }
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
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
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
      <div className="lives-container">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-heart"></i>
      </div>
    </div>
  );
}

export default GameFlow;
