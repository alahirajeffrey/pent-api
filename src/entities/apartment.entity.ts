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

    @Column("text",{nullable: true, array:true})
    reviewsId: String[]

    @Column()
    details: string

    @Column({default: false})
    isApartmentVerified: boolean

    @Column()
    landlordId: string

    @Column({type:"timestamp", default:()=>"CURRENT_TIMESTAMP"})
    dateCreated: Date
}