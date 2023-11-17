export interface Player {
  name: string;
  score: number;
}

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userSelectedAnswer?: string;
}

export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}