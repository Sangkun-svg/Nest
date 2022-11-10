import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root', // replaece dotenv constant
        password: '1234', // replaece dotenv constant
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, //WARN: Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      });

      return dataSource.initialize();
    },
  },
];
