import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

  @PrimaryGeneratedColumn("uuid")
  userId: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
  dateCreated: Date 
}