import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Generated,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true })
	@Generated("increment")
	sequence_id!: number;

	@Column()
	name!: string;

	@Column({
		unique: true,
	})
	email!: string;

	@Column()
	password!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
