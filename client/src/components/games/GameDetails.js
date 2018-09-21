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
import music from '../../lib/sounds/bike-rides.mp3'

class GameDetails extends PureComponent {
state = {
  condition: true
}
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  componentDidMount(){
    this.props.getImages()
  }

  findUserX = () =>{
    if(this.props.game.status === "started" || this.props.game.status === "finished"){
    const playerX = this.props.game.players.find(player => player.symbol === "x")
    const userX = playerX.userId

    return Object.values(this.props.users).find(user => user.id===userX).firstName
    }
  }

  findUserO = () =>{
    if(this.props.game.status === "started" || this.props.game.status === "finished"){

    const playerO = this.props.game.players.find(player => player.symbol === "o")
    const userO= playerO.userId
    return Object.values(this.props.users).find(user => user.id===userO).firstName
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = async (toRow, toCell) => {

    const {game, updateGame} = this.props  
    
    // setTimeout(()=>{
    //   this.setState({
    //     condition: !this.state.condition
    //   })
    // }, 1000)


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

    await updateGame(game.id, board)

    console.log('should flip??')

  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props || !prevProps.game) return
    if (prevProps.game!== this.props.game){
      this.setState({
        condition: !this.state.condition
       })
    }
  }

  render() {
    console.log(this.state)
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

return (
  <div className = "game-wrapper">
   <div className="paper-wrapper">
    <Paper className="left-paper">
      <h3>Game #{game.id}</h3>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div className="your-turn">It's your turn!</div>
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

    </Paper>
    <Paper className="right-paper">
      <h3> Score: </h3>
      <p>  {this.findUserX()}: {game.scoreX} points </p>
      <p> {this.findUserO()}: {game.scoreO} points </p>
    </Paper>
    </div>
    <div className="gameboard-wrapper">
      {
        game.status === 'started' &&
        <div>
        <Board board={game.board} makeMove={this.makeMove} images={images.allImages} className={ this.state.condition ? "is-flipped" : "" }/>  
        </div>
      } 
      {
        game.status === 'finished' &&
        <div className = "emoji-animation" >
          <img src="https://media1.giphy.com/media/OGEbQXwNesZ6U/giphy.gif" alt="emoji-animation"/> 
        </div>
      }
      <audio className = "gameMusic" autoPlay loop controls> 
        <source src={music} type="audio/mpeg"/>
          If you see this, update your browser
      </audio>  
    </div>
  </div>)
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
