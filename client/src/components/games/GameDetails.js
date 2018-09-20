import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame } from '../../actions/games'
import {getImages, selectImages} from '../../actions/images'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  componentDidMount(){
    this.props.getImages()
  }

  componentDidUpdate(){

  }


  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {

    const {game, updateGame, images} = this.props  

    // const card = document.getElementById(`${toRow}-${toCell}`)
    // card.className = "board-tile-back-selected"
    
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) {
  
          // const foundImage = images.allImages.find(image => cell === image.id)  
          // this.props.selectImages(foundImage) 

          const row = game.hiddenboard[toRow]

          return row[toCell]
        }
        else return cell
      }))

    updateGame(game.id, board)
  }

  

  render() {
    const {game, images, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board} makeMove={this.makeMove} images={images.allImages}/>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  images: state.images
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, getImages, selectImages
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
