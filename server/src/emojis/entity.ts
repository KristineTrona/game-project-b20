import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'



export interface EmojiInterface{
  id?: number
  name: string
  url: string
}

@Entity()
export class Emoji extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  url: string

}
