import React from 'react'
import './Board.css'



const renderCel = (makeMove, rowIndex, cellIndex, cell, hasTurn, images) => {
  return (
    <div
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >
      <img src={images.find(image => image.id===cell).url}/>
    </div>
  )
}

export default ({board, makeMove, images}) => board.map((rows, rowIndex) =>
  <div key={rowIndex}>
    {rows.map((cell, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,cell,false, images))}
  </div>
)
