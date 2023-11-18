import { useRetroAppContext } from "../../providers/RetroAppProvider";
import { Player } from "../../types/interfaces";
import "./LeaderBoard.css";
import { PlayerEntry } from "./PlayerEntry";

const playerArray: Player[] = [
  {
    name: "Ab ",
    score: 1000,
  },
  {
    name: "Player 2",
    score: 800,
  },
  {
    name: "Player 3",
    score: 600,
  },
  {
    name: "Player 4",
    score: 500,
  },
  {
    name: "Player 5",
    score: 400,
  },
];

export const LeaderBoard = () => {
  const { setCurrentScreen } = useRetroAppContext();

  return (
    <div className="start-page-wrapper">
      <div className="lb-btn-container">
        <button
          className="lb-btn"
          onClick={() => {
            setCurrentScreen("");
          }}
        >
          Back to Start!
        </button>
      </div>
      <div className="leaderboard">
          <div className="header">Retro Leaderboard</div>
          {playerArray.map((player, index) => {
            return <PlayerEntry key={index} position={index} player={player} />;
          })}
        </div>
    </div>
  );
};
