import { useState } from "react";

export const GameOver = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(86); // Assuming you have a way to track the score

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Ensure only uppercase letters and limit to 3 characters
    const newName = e.target.value.slice(0, 3).toUpperCase();
    setName(newName);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO: Add logic to submit data to the leaderboard (fetch call or other mechanism)
    console.log(`Submitting score ${score} with name ${name}`);
    // Reset the form or navigate to another page if needed
  };

  return (
    <div className="game-over-container">
      <h1>Game Over!</h1>
      <h3>Score: {score}</h3>
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
