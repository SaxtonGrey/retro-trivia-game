import { useRetroAppContext } from "../../providers/RetroAppProvider";
import "./LeaderBoard.css";
import { PlayerEntry } from "./PlayerEntry";

export const LeaderBoard = () => {
  const { setCurrentScreen, allPlayers } = useRetroAppContext();

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
          {allPlayers.map((player, index) => {
            return <PlayerEntry key={index} position={index} player={player} />;
          })}
        </div>
    </div>
  );
};
