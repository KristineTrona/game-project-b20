# Multiplayer Emoji Memory game

This project was built upon a multiplayer tic tac toe game base provided by the Codaisseur.
The game is deployed on https://memory-game-b20.herokuapp.com/games

## Built with

Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API but also sends messages over websockets using SocketIO. 

## Game rules

In order to play a game the user has to first sign up and then login with an e-mail address and a password.

Once logged in, the user is able to create a new game and another user is then able to join the game by clicking on "Watch" and then selecting a "Join game" button. 

Once the game has started 24 tiles with hidden emoji-image pairs are displayed. The player who has the turn is able to click on any two tiles - if the images are a match, the tiles dissapear, the player scores 10 points and has another turn. If the tiles do not match they return back to their original hidden state and the other player has his turn. 

The game ends when there are no more tiles left on the game board and the player with highest score wins.
