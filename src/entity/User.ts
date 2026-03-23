import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Calculation } from "./Calculation";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    first_name: string;

    @Column({ type: "varchar", length: 255 })
    last_name: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @OneToMany(() => Calculation, (calculation) => calculation.user)
    calculations: Calculation[];
}
