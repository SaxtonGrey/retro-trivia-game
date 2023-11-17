import { useState } from "react";
import "./App.css";
import GameFlow from "./Components/GameFlow";
import { StartPage } from "./Components/StartPage";

function App() {
  const [startGame, setStartGame] = useState(false);

  const handleClick = () => {
    setStartGame(true);
  };

  return <>{startGame ? <GameFlow /> : <StartPage onClick={handleClick} />}</>;
}

export default App;
