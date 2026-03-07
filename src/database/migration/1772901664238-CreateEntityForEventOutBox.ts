import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntityForEventOutBox1772901664238 implements MigrationInterface {
    name = 'CreateEntityForEventOutBox1772901664238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_out_box" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "payload" jsonb NOT NULL, "processed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_99fb3180f4fc710af1e847fa856" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event_out_box"`);
    }

}
