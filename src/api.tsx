export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

const baseUrl = "https://opentdb.com/api.php?";

export const Requests = {
  getQuestions: (
    limit: number,
    difficulty: string,
    type: string
  ): Promise<TriviaQuestion[]> => {
    return fetch(
      `${baseUrl}amount=${limit}&difficulty=${difficulty}&type=${type}`
    )
      .then((response) => response.json())
      .then((data: TriviaResponse) => data.results);
  },
};
