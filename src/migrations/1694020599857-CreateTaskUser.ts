import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTaskUser1694020599857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO Task (id, title, completed, isDeleted, isMigrate)
            VALUES (1,'EDER E GUSTAVO MONSTROS SAGRADOS', 1, 0, 0)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM Task WHERE id = 1 
    `);
    }

}
