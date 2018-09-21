import React from 'react'
import './Board.css'


const renderCel = (makeMove, rowIndex, cellIndex, cell, hasTurn, images, className) => {
  
  return(
      <div 
        key={`${rowIndex}-${cellIndex}`}
        className="scene">

        {cell===null &&
        <div className={`card`}>
        <div
        className="card-front"
        id={`${rowIndex}-${cellIndex}`}
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}>
        </div>
        </div>
        }

        {cell!== null && cell !== "" && 
        <div className={`card`}>
        <div
          className="card-back"
          id={`${rowIndex}-${cellIndex}`}
          disabled={hasTurn}
          onClick={() => makeMove(rowIndex, cellIndex)}
          key={`${rowIndex}-${cellIndex}`}>
          <img src={images.find(image => image.id===cell).url}/>
        </div>
        </div>} 

        {cell==="" && 
        <div
          className="card-guessed"
          id={`${rowIndex}-${cellIndex}`}
          disabled={hasTurn}
          onClick={() => makeMove(rowIndex, cellIndex)}
          key={`${rowIndex}-${cellIndex}`}>
        </div>}

       
      </div>) 
}

export default function renderBoard ({board, makeMove, images, className}){ 
  return (
  <div className="board-wrapper">
    {board.map((rows, rowIndex) =>
     <div key={rowIndex} className="row-wrapper">
    {rows.map((cell, cellIndex) => renderCel(makeMove, rowIndex, cellIndex, cell, false, images, className))}
    </div> )}
  </div>
) }
