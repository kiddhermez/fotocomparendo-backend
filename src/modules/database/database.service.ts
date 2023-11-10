import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2';
@Injectable()
export class DatabaseService<T> {
  private connection: mysql.Connection;
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    const url = this.config.get('DATABASE_URL');
    this.connection = mysql.createConnection({
      uri: url,
      ssl: { rejectUnauthorized: false },
    });
    this.connection?.connect();
  }

  async queryGet(query: string, values?: any[]) {
    const result = new Promise<T[]>((resolve, reject) => {
      this.connection.query(
        query,
        values,
        (err, rows: mysql.ResultSetHeader[]) => {
          if (err) {
            reject(err);
          } else {
            const results: T[] = rows.map((row: any) => {
              return Object.assign({} as T, row);
            });
            resolve(results.length > 0 ? results : undefined);
          }
        },
      );
    });
    return result;
  }

  async queryCall<T>(query: string, values?: any[]) {
    const data = await this.queryGet(query, values);
    return Object.values(data[0]) as T[];
  }

  async query(query: string, values?: any[]) {
    const result = new Promise<mysql.ResultSetHeader>((resolve, reject) => {
      this.connection.query(
        query,
        values,
        (err, rows: mysql.ResultSetHeader) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      );
    });
    return result;
  }
}
