import { useRetroAppContext } from "../providers/RetroAppProvider";
import "../CSS/StartPage.css";

export const StartPage = () => {
  const { currentScreen, setCurrentScreen } = useRetroAppContext();

  const handleLeaderBoardClick = () => {
    if (currentScreen === "display-leader") {
      setCurrentScreen("");
    } else {
      setCurrentScreen("display-leader");
    }
  };

  return (
    <div className="start-page-wrapper">
      <div className="lb-btn-container">
        <button
          className="lb-btn"
          onClick={() => {
            handleLeaderBoardClick();
          }}
        >
          LeaderBoard
        </button>
      </div>
      <div className="title-container">
        <h2>Retrivia!</h2>
      </div>
      <div className="start-container">
        <div
          onClick={() => {
            setCurrentScreen("start-game");
          }}
        >
          Start Game
        </div>
      </div>
    </div>
  );
};
