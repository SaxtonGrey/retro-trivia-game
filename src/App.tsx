import "./App.css";
import GameFlow from "./Components/GameFlow";
import { LeaderBoard } from "./Components/LeaderBoard/LeaderBoard";
import { StartPage } from "./Components/StartPage";
import { useRetroAppContext } from "./providers/RetroAppProvider";

function App() {
  const { currentScreen } = useRetroAppContext();
  return (
    <>
      {currentScreen === "start-game" ? <GameFlow /> : <StartPage />}
      {currentScreen === "display-leader" && <LeaderBoard />}
    </>
  );
}

export default App;
