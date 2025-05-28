import { Injectable, Inject } from '@nestjs/common';
import { Client, types } from 'cassandra-driver';

@Injectable()
export class ScyllaService {
  constructor(
    @Inject('SCYLLA_CONNECTION') private readonly client: Client,
  ) {}

  async query<T = any>(cql: string, params: any[] = []): Promise<T[]> {
    const result = await this.client.execute(cql, params, { prepare: true });
    return result.rows as T[];
  }

  async insert<T = any>(table: string, data: Record<string, any>): Promise<void> {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    await this.client.execute(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
      Object.values(data),
      { prepare: true },
    );
  }

  async disconnect(): Promise<void> {
    await this.client.shutdown();
  }
}
