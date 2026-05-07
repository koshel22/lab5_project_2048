function Tile({ value = null, position = null, isMerged = false, mergeDirection = null }) {
  const getTileColor = (value) => {
    if (!value) return 'tile-empty'
    
    const tileColors = {
      2: 'tile-2',
      4: 'tile-4',
      8: 'tile-8',
      16: 'tile-16',
      32: 'tile-32',
      64: 'tile-64',
      128: 'tile-128',
      256: 'tile-256',
      512: 'tile-512',
      1024: 'tile-1024',
      2048: 'tile-2048',
    }
    
    return tileColors[value] || 'tile-large'
  }

  return (
    <div 
      className={`tile ${getTileColor(value)} ${isMerged ? 'merged' : ''} ${mergeDirection ? `merge-${mergeDirection}` : ''}`}
      data-value={value}
    >
      {value && <span className="tile-value">{value}</span>}
    </div>
  )
}

export default Tile
