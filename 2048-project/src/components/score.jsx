function Score() {
  // Mock score state - will be replaced with actual game logic
  const currentScore = 48

  return (
    <div className="score-container">
      <div className="score-box">
        <div className="score-label">Score</div>
        <div className="score-value">{currentScore}</div>
      </div>
      <button className="new-game-btn">New Game</button>
    </div>
  )
}

export default Score
