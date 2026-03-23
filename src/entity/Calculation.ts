import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("calculations")
export class Calculation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float" })
    operand1: number;

    @Column({ type: "varchar", length: 10 })
    operator: string;

    @Column({ type: "float" })
    operand2: number;

    @Column({ type: "float" })
    result: number;

    @ManyToOne(() => User, (user) => user.calculations, { onDelete: "CASCADE" })
    user: User;

    @CreateDateColumn()
    created_at: Date;
}
