import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
//import {Emoji} from '../emojis/entity';

export type Symbol= "x" | "o"
export type Row = Number[] | null[]
export type Board = Array<Row>

type Status = 'pending' | 'started' | 'finished'


const images = [1,2,3,4,5,6]

const starterBoard = images.concat(images)

const randomizedBoard = starterBoard.sort(() => 0.5 - Math.random())

const emptyRow: Row = [null, null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

const hiddenRow1: Row = [randomizedBoard[0], randomizedBoard[1], randomizedBoard[2], randomizedBoard[3]]
const hiddenRow2: Row = [randomizedBoard[4], randomizedBoard[5], randomizedBoard[6], randomizedBoard[7]]
const hiddenRow3: Row = [randomizedBoard[8], randomizedBoard[9], randomizedBoard[10], randomizedBoard[11]]
const hiddenBoard: Board = [ hiddenRow1, hiddenRow2, hiddenRow3 ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column ('json', {default: hiddenBoard})
  hiddenboard: Board

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
