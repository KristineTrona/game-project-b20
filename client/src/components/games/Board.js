import React from 'react'
import './Board.css'


const renderCel = (makeMove, rowIndex, cellIndex, cell, hasTurn, images) => {
  
  if(cell=== null){
    return(
    <div
      className="card"
      id={`${rowIndex}-${cellIndex}`}
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}>
      Hello
    </div>)
  } else return (
    <div
      className="card"
      id={`${rowIndex}-${cellIndex}`}
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}>
        <div className="board-tile-front">
        </div>
        <div className="board-tile-back">
          <img src={images.find(image => image.id===cell).url}/>
        </div>
    </div>
  )
}

export default function renderBoard ({board, makeMove, images}){ 
  return (
  <div className="board-wrapper">
    {board.map((rows, rowIndex) =>
     <div key={rowIndex} className="row-wrapper">
    {rows.map((cell, cellIndex) => renderCel(makeMove, rowIndex, cellIndex, cell, false, images))}
    </div> )}
  </div>
) }
