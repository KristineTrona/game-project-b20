import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
//import {Emoji} from '../emojis/entity';

export type Symbol= "x" | "o"
export type Row = Number[]
export type Board = [ Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'


// const emojis = ["https://banner2.kisspng.com/20171201/b49/smiling-face-with-sunglasses-cool-emoji-png-5a222c11e0dd77.6968424215121889459211.jpg",
//  "https://banner2.kisspng.com/20180325/ute/kisspng-emoji-love-heart-sticker-emoticon-emoji-5ab86fdec2e6d0.1707378915220367027983.jpg",
//   "https://banner2.kisspng.com/20180202/srq/kisspng-laughter-face-with-tears-of-joy-emoji-emoticon-cli-crying-emoji-png-transparent-image-5a754051c0cbe5.6174084415176336177897.jpg",
//    "https://banner2.kisspng.com/20180402/ogw/kisspng-emoji-wink-smiley-clip-art-crying-emoji-5ac2953f831bb2.847187371522701631537.jpg",
//     "https://banner2.kisspng.com/20180202/biw/kisspng-t-shirt-emoji-domain-nerd-glasses-sunglasses-emoji-png-clipart-5a73fc78eb8030.6868989215175507129646.jpg",
//      "https://banner2.kisspng.com/20180404/qye/kisspng-pile-of-poo-emoji-sadness-emoticon-sad-emoji-5ac49f3e848fd4.339742351522835262543.jpg"]

const emojis = [1,2,3,4,5,6]

const starterBoard = emojis.concat(emojis)

const randomizedBoard = starterBoard.sort(() => 0.5 - Math.random())

const emptyRow1: Row = [randomizedBoard[0], randomizedBoard[1], randomizedBoard[2], randomizedBoard[3]]
const emptyRow2: Row = [randomizedBoard[4], randomizedBoard[5], randomizedBoard[6], randomizedBoard[7]]
const emptyRow3: Row = [randomizedBoard[8], randomizedBoard[9], randomizedBoard[10], randomizedBoard[11]]
const emptyBoard: Board = [ emptyRow1, emptyRow2, emptyRow3 ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol
}
