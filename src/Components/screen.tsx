import React, { Component } from "react";

interface Question {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  allAnswers?: string[];
}

class Questions extends Component {
  state: { questions: Question[] } = {
    questions: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const numOfQuestions = 10;
      const questionObj: Question[] = await (
        await fetch(
          `https://the-trivia-api.com/api/questions?limit=${numOfQuestions}`
        )
      ).json();
      console.log(questionObj);

      const shuffledQuestions: Question[] = questionObj.map((question) => {
        if (question.incorrectAnswers && question.incorrectAnswers.length > 0) {
          question.allAnswers = [
            question.correctAnswer,
            ...question.incorrectAnswers,
          ];

          for (let i = question.allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [question.allAnswers[i], question.allAnswers[j]] = [
              question.allAnswers[j],
              question.allAnswers[i],
            ];
          }

          return question;
        } else {
          console.error(
            `Error: Missing or empty incorrectAnswers for question with ID ${question.id}`
          );
          return {} as Question; // Handle this case best idea is a couple of preset questions just in case
        }
      });

      this.setState({
        questions: shuffledQuestions.filter(
          (question) => Object.keys(question).length > 0
        ),
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  render() {
    const { questions } = this.state;
    const firstQuestion =
      questions.length > 0 ? questions[0] : ({} as Question);

    return (
      <div>
        {firstQuestion && (
          <>
            <h1>{firstQuestion.question}</h1>
            <div>
              {firstQuestion.allAnswers?.map((answer, index) => (
                <p key={index}>{`${index + 1} ${answer}`}</p>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Questions;
