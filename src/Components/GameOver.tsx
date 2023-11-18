import { useState } from "react";
import { useRetroAppContext } from "../providers/RetroAppProvider";

export const GameOver = () => {
  const { finalScore, setCurrentScreen, addPlayerToLeaderBoard } =
    useRetroAppContext();
  const [name, setName] = useState("");

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Ensure only uppercase letters and limit to 3 characters
    const newName = e.target.value.slice(0, 3).toUpperCase();
    setName(newName);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addPlayerToLeaderBoard(finalScore, name);
    setCurrentScreen("display-leader");
  };

  return (
    <div className="game-over-container">
      <h1>Game Over!</h1>
      <h3>Score: {finalScore}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name (3 letters, all caps):
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            maxLength={3}
            pattern="[A-Za-z]{3}"
            required
          />
        </label>
        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
};
