import React from 'react'
import './Board.css'

const renderCel = (makeMove, rowIndex, cellIndex, url, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    ></button>
  )
}
//<img src={url}/>
//{symbol || '-'}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
