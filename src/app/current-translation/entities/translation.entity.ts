import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('translations')

export class Translation{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    word_kk: string;

    @Column({ nullable: false })
    word_ru: string;

    @Column({nullable: true})
    meaning_kk: string;

    @Column({nullable: true})
    meaning_ru: string;

    @Column({ type: 'timestamp', default: () => 'NOW()', select: false })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()', select: false })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}