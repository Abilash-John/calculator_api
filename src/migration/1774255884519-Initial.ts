import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1774255884519 implements MigrationInterface {
    name = 'Initial1774255884519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar(255) NOT NULL, "last_name" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_97672db8883395d32a11273c8db" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "calculations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "operand1" float NOT NULL, "operator" varchar(10) NOT NULL, "operand2" float NOT NULL, "result" float NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_f9feb493b493b6694c16c048143" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "calculations"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
