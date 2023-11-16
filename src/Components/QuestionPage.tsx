import { TriviaQuestion } from "../api";

export const QuestionPage = ({
  questions,
}: {
  questions: TriviaQuestion[];
}) => {
  return (
    <>
      {questions.map((question, index) => (
        <div key={index}>
          <p dangerouslySetInnerHTML={{ __html: question.question }} />
          <ul>
            {[...question.incorrect_answers, question.correct_answer].map(
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
