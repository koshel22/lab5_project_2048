function Score({ score, onRestart }) {
  return (
    <div className="score-container">
      <div className="score-box">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      <button className="new-game-btn" onClick={onRestart}>New Game</button>
    </div>
  )
}

export default Score
