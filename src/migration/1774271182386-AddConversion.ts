import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConversion1774271182386 implements MigrationInterface {
    name = 'AddConversion1774271182386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "from_unit" varchar NOT NULL, "to_unit" varchar NOT NULL, "from_value" varchar NOT NULL, "result_value" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar(255) NOT NULL, "last_name" varchar(255) NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_97672db8883395d32a11273c8db" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "first_name", "last_name", "email", "password", "is_active") SELECT "id", "first_name", "last_name", "email", "password", "is_active" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_conversions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "from_unit" varchar NOT NULL, "to_unit" varchar NOT NULL, "from_value" varchar NOT NULL, "result_value" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_2789378fe3e1359d7d903b6e28c" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_conversions"("id", "category", "from_unit", "to_unit", "from_value", "result_value", "created_at", "userId") SELECT "id", "category", "from_unit", "to_unit", "from_value", "result_value", "created_at", "userId" FROM "conversions"`);
        await queryRunner.query(`DROP TABLE "conversions"`);
        await queryRunner.query(`ALTER TABLE "temporary_conversions" RENAME TO "conversions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversions" RENAME TO "temporary_conversions"`);
        await queryRunner.query(`CREATE TABLE "conversions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "from_unit" varchar NOT NULL, "to_unit" varchar NOT NULL, "from_value" varchar NOT NULL, "result_value" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "conversions"("id", "category", "from_unit", "to_unit", "from_value", "result_value", "created_at", "userId") SELECT "id", "category", "from_unit", "to_unit", "from_value", "result_value", "created_at", "userId" FROM "temporary_conversions"`);
        await queryRunner.query(`DROP TABLE "temporary_conversions"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar(255) NOT NULL, "last_name" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_97672db8883395d32a11273c8db" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "first_name", "last_name", "email", "password", "is_active") SELECT "id", "first_name", "last_name", "email", "password", "is_active" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "conversions"`);
    }

}
