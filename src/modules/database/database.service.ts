import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private connection: Pool;
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    const url = this.config.get('DATABASE_URL');
    this.connection = new Pool({
      connectionString: url,
    });
  }

  async query(query: string) {
    const result = await this.connection.query(query);
    return result;
  }
}
