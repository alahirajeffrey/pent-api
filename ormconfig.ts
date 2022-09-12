import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';


ConfigModule.forRoot();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // logging: true,
  migrations: ['dist/src/database/migration/*.js'],
  synchronize: true,
});