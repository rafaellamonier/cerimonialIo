import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Wedding } from "./Wedding";

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true
  })
  value!: number;

  @Column({
    default: "pending"
  })
  status!: string;

  @Column()
  wedding_id!: number;

  @ManyToOne(() => Wedding)
    @JoinColumn({
        name: "wedding_id"
  })
  wedding!: Wedding;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}