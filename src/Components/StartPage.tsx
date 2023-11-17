interface StartPageProps {
  onClick: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onClick }) => {
  return (
    <div className="start-page-wrapper">
      <div className="lb-btn-container">
        <div className="lb-btn">LeaderBoard</div>
      </div>
      <div className="title-container">
        <h2>Retrivia!</h2>
      </div>
      <div className="start-container">
        <div
          onClick={() => {
            onClick();
          }}
        >
          Start Game
        </div>
      </div>
    </div>
  );
};
