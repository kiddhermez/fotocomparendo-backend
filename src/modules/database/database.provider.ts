import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const databaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get('NODE_ENV') !== 'production';

    const dbConfig = {
      type: 'postgres',
      url: config.get('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnv,
      logging: config.get('DATABASE_LOGGING'),
      ssl: {
        rejectUnauthorized: true,
      },
    } as ConnectionOptions;

    return dbConfig;
  },
});
