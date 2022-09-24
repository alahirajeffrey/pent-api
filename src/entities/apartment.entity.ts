import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";

@Entity()
export class Apartment{
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    address: string

    @Column()
    imagesLink: string

    @OneToMany(()=>Review, (review: Review)=>review.id)
    @JoinColumn()
    reviewsId: Review[]

    @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    dateCreated: Date

    @Column()
    details: string

    @Column({default: false})
    isApartmentVerified: boolean

    @Column()
    landlordId: string

}