import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";
import { User } from "./user.entity";

@Entity()
export class Apartment{
    
    @PrimaryGeneratedColumn("uuid")
    apartmentId: string

    @Column()
    address: string

    @Column()
    images: string

    @ManyToOne(()=>Review, (review: Review)=>review.reviewId)
    reviewsId: Review[]

    @ManyToOne(()=>User, (user : User)=>user.userId)
    reviewersId: User[]

    @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    dateCreated: Date

    @Column()
    numberOfRooms: number

}