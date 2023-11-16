// this needs to be changed based on where we are updating the real db
const API_CONFIG = {
  baseURL: "http://localhost:3000",
};


// adding new player score to the leaderboard 
import { Player } from "../types/interfaces";
export const addPlayerToDB = ({ name, score }: Player) => {
  const body = JSON.stringify({
    name,
    score,
  });

  return fetch(API_CONFIG.baseURL + "/playerScores/", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};

export const getAllPlayersFromDB = () => {
  return fetch(API_CONFIG.baseURL + "/playerScores/").then((response) => {
    return response.json();
  });
}


