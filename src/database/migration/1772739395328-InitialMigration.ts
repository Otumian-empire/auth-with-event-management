import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1772739395328 implements MigrationInterface {
    name = "InitialMigration1772739395328";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "middleName" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "dateOfBirth" date, "isActive" boolean NOT NULL DEFAULT true, "lastLoggedInAt" TIMESTAMP, "passwordChangedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`
        );
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
