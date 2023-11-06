import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvEnum } from 'src/common/enums';
import { ConnectionOptions } from 'typeorm';

export const databaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get('NODE_ENV') !== EnvEnum.Production;

    const dbConfig = {
      type: 'postgres',
      host: config.get('DATABASE_HOST'),
      port: config.get('DATABASE_PORT'),
      username: config.get('DATABASE_USER'),
      password: config.get('DATABASE_PASSWORD'),
      database: config.get('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnv,
      logging: config.get('DATABASE_LOGGING'),
    } as ConnectionOptions;

    return dbConfig;
  },
});
