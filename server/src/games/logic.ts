import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board} from './entities'
//Row, Symbol 


@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    //const symbols = [ 'x', 'o', null ]
    return board.length === 3 &&
      board.every(row =>
        row.length === 4 //&&
        //row.every(symbol => symbols.includes(symbol))
      )
  }
}

// export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
//   const changes = 
//     from.map(
//       (row, rowIndex) => row.map((image, columnIndex) => ({
//         from: image, 
//         to: to[rowIndex][columnIndex]
//       }))
//     )
//     .reduce((a,b) => a.concat(b))
//     .filter(change => change.from !== change.to)

//   console.log(changes)
  

  // return changes.length === 2 && 
  //   changes[0].to === playerSymbol && 
//     changes[0].from === null
// }


// export const isValidTransition = () => {

//     const moves = (board1, board2) => 
//     board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length

//   return true
// }



// export const calculateWinner = (board: Board): Symbol | null =>
//   board
//     .concat(
//       // vertical winner
//       [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
//     )
//     .concat(
//       [
//         // diagonal winner ltr
//         [0, 1, 2].map(n => board[n][n]),
//         // diagonal winner rtl
//         [0, 1, 2].map(n => board[2-n][n])
//       ] as Row[]
//     )
//     .filter(row => row[0] && row.every(symbol => symbol === row[0]))
//     .map(row => row[0])[0] || null

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)
