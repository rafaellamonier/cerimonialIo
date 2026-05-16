import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { OneToMany } from "typeorm";
import { Supplier } from "./Supplier";

@Entity("weddings")
export class Wedding {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  couple_name!: string;

  @Column({
    type: "date"
  })
  wedding_date!: Date;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2
  })
  budget!: number;

  @Column()
  user_id!: string;

  @OneToOne(() => User)
    @JoinColumn({
    name: "user_id"
  })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
  
  @OneToMany(() => Supplier, supplier => supplier.wedding)
  suppliers!: Supplier[];
};