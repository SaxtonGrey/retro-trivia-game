import "./App.css";
import GameFlow from "./Components/GameFlow";
import { GameOver } from "./Components/GameOver";
import { LeaderBoard } from "./Components/LeaderBoard/LeaderBoard";
import { StartPage } from "./Components/StartPage";
import { useRetroAppContext } from "./providers/RetroAppProvider";

function App() {
  const { currentScreen } = useRetroAppContext();

  let screenToDisplay;
  if (currentScreen === "start-game") {
    screenToDisplay = <GameFlow />;
  } else if (currentScreen === "display-leader") {
    screenToDisplay = <LeaderBoard />;
  } else if (currentScreen === "game-over") {
    screenToDisplay = <GameOver />;
  } else {
    screenToDisplay = <StartPage />;
  }

  return <>{screenToDisplay}</>;
}

export default App;
