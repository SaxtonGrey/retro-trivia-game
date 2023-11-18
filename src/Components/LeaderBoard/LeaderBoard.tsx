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
        {/* {allPlayers.map((player, index) => {
          return <PlayerEntry key={index} position={index} player={player} />;
        })} */}
        <div className="entry">
          <span className="rank">1. </span>
          <span className="name">SGV</span>
          <span className="score">420</span>
        </div>
        <div className="entry">
          <span className="rank">2. </span>
          <span className="name">GOD</span>
          <span className="score">419</span>
        </div>
        <div className="entry">
          <span className="rank">3. </span>
          <span className="name">BOB</span>
          <span className="score">65</span>
        </div>
      </div>
    </div>
  );
};
