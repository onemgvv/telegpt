import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("integer")
  age: number;

  @Column("integer")
  userId: number;

  @Column("integer", {
    default: 0,
  })
  orders: number;
}
