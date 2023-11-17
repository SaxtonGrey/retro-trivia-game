import { Player } from "../../types/interfaces";

export const PlayerEntry = ({
  player,
  position,
}: {
  player: Player;
  position: number;
}) => {
  const { name, score } = player;
  return (
    <div className="entry">
      <span className="rank">{position}. </span>
      <span className="name">{name}</span>
      <span className="score">{score}</span>
    </div>
  );
};
