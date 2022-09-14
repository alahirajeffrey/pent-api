import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Apartment } from "./apartment.entity";
import { User } from "./user.entity";

@Entity()
export class Review{
    @PrimaryGeneratedColumn("uuid")
    reviewId: string
    
    @Column()
    review: string

    @Column()
    environmentReview: string

    @Column()
    amenitiesReview: string

    @Column()
    landlordReview: string

    @OneToOne(()=>Apartment, (apartment: Apartment)=> apartment.apartmentId)
    apartmentId: string

    @ManyToOne(()=>User, (user: User)=>user.userId)
    reveiwerId: string

    @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    dateCreated: Date

}