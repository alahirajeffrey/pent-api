import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Apartment } from "./apartment.entity";
import { User } from "./user.entity";

@Entity()
export class Review{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({nullable: false})
    apartmentReview: string

    @Column({nullable: true})
    environmentReview: string

    @Column({nullable: true})
    amenitiesReview: string

    @Column({nullable: true})
    landlordReview: string

    @Column({nullable: false})
    apartmentId: string

    @Column({nullable: false})
    reviewerId: string

    @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    dateCreated: Date

}