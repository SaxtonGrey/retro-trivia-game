export const StartPage = () => {
  return (
    <div className="page-wrapper">
      <div className="lb-btn-container">
        <div className="lb-btn">LeaderBoard</div>
      </div>
      <div className="title-container">
        <h2>Retrivia!</h2>
      </div>
      <div className="start-container">
        <div
          onClick={() => {
            //load game screen component, will need to use props and react children
          }}
        >
          Start Game
        </div>
      </div>
    </div>
  );
};
