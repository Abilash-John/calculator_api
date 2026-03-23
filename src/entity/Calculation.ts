import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("calculations")
export class Calculation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float", nullable: true })
    operand1: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    operator: string;

    @Column({ type: "float", nullable: true })
    operand2: number;

    @Column({ type: "text", nullable: true })
    full_expression: string;

    @Column({ type: "float" })
    result: number;

    @ManyToOne(() => User, (user) => user.calculations, { onDelete: "CASCADE" })
    user: User;

    @CreateDateColumn()
    created_at: Date;
}
