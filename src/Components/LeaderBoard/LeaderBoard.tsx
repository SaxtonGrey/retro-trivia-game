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
];

export const LeaderBoard = () => {
  return (
    <div className="leaderboard">
      <div className="header">Retro Leaderboard</div>
      {playerArray.map((player, index) => {
        return <PlayerEntry key={index} position={index} player={player} />;
      })}
    </div>
  );
};
