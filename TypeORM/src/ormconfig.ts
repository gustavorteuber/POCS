import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: false,
  logging: true,
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
});

export default AppDataSource
