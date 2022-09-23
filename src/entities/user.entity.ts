import { UserType } from "src/common/enums/user-type.enum";
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

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.TENANT
  })
  type : UserType

  @Column()
  password: string

  @Column({
    type:"boolean"
  })
  isEmailVerified: false

  @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
  dateCreated: Date 
}