import { TriviaQuestion, TriviaResponse } from "./types/interfaces";

const baseUrl = "https://opentdb.com/api.php?";

export const Requests = {
  getQuestions: async (
    limit: number,
    difficulty: string,
    type: string
  ): Promise<TriviaQuestion[]> => {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const response = await fetch(
          difficulty === 'mixed'
          ? `${baseUrl}amount=${limit}&type=${type}&category=15`
          : `${baseUrl}amount=${limit}&difficulty=${difficulty}&type=${type}&category=15`
        );

        if (response.status === 429) {
          // If rate-limited, wait for a while and then retry
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
          retries++;
        } else {
          const data: TriviaResponse = await response.json();
          return data.results;
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        retries++;
      }
    }

    // If max retries reached and still unsuccessful, throw an error
    throw new Error("Failed to fetch questions within retry limit");
  },
};
