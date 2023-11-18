// this needs to be changed based on where we are updating the real db
const API_CONFIG = {
  baseURL: "http://localhost:5000",
};


// adding new player score to the leaderboard 
export const addPlayerToDB = ( name: string, score: number) => {
  const body = JSON.stringify({
    name,
    score,
  });

  return fetch(API_CONFIG.baseURL + "/players/", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};

//get all the players from the database
export const getAllPlayersFromDB = () => {
  return fetch(API_CONFIG.baseURL + "/players/").then((response) => {
    return response.json();
  });
}


