import { Client } from 'cassandra-driver';
export declare class ScyllaService {
    private readonly client;
    constructor(client: Client);
    query<T = any>(cql: string, params?: any[]): Promise<T[]>;
    insert<T = any>(table: string, data: Record<string, any>): Promise<void>;
    disconnect(): Promise<void>;
}
