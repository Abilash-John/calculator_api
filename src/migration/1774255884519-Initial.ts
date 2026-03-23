import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1774255884519 implements MigrationInterface {
    name = 'Initial1774255884519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calculations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "operand1" float NOT NULL, "operator" varchar(10) NOT NULL, "operand2" float NOT NULL, "result" float NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_calculations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "operand1" float NOT NULL, "operator" varchar(10) NOT NULL, "operand2" float NOT NULL, "result" float NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_f9feb493b493b6694c16c048143" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_calculations"("id", "operand1", "operator", "operand2", "result", "created_at", "userId") SELECT "id", "operand1", "operator", "operand2", "result", "created_at", "userId" FROM "calculations"`);
        await queryRunner.query(`DROP TABLE "calculations"`);
        await queryRunner.query(`ALTER TABLE "temporary_calculations" RENAME TO "calculations"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" RENAME TO "temporary_calculations"`);
        await queryRunner.query(`CREATE TABLE "calculations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "operand1" float NOT NULL, "operator" varchar(10) NOT NULL, "operand2" float NOT NULL, "result" float NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "calculations"("id", "operand1", "operator", "operand2", "result", "created_at", "userId") SELECT "id", "operand1", "operator", "operand2", "result", "created_at", "userId" FROM "temporary_calculations"`);
        await queryRunner.query(`DROP TABLE "temporary_calculations"`);
        await queryRunner.query(`DROP TABLE "calculations"`);
    }

}
