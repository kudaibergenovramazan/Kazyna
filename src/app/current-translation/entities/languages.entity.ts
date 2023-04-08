
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Languages } from "../translation.type";

@Entity('languages')
export class Language{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: Languages;
}