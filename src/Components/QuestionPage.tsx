import { TriviaQuestion } from "../types/interfaces";

export const QuestionPage = ({
  questions,
}: {
  questions: TriviaQuestion[];
}) => {
  const shuffleAnswers = (answers: string[]) => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i],];
    }
    return shuffledAnswers;
  };
  return (
    <>
      {questions.map((question, index) => (
        <div key={index}>
          <p dangerouslySetInnerHTML={{ __html: question.question }} />
          <ul>
            {shuffleAnswers([...question.incorrect_answers, question.correct_answer]).map(
              (answer, answerIndex) => (
                <li
                  key={answerIndex}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            )}
          </ul>
        </div>
      ))}
    </>
  );
};
