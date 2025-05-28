import { Module, Global } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { ScyllaService } from './scylla.service';

@Global()
@Module({
  providers: [
    {
      provide: 'SCYLLA_CONNECTION',
      useFactory: async () => {
        const client = new Client({
          contactPoints: [process.env.SCYLLA_HOST || '127.0.0.1'],
          localDataCenter: process.env.SCYLLA_DATACENTER || 'datacenter1',
          keyspace: process.env.SCYLLA_KEYSPACE || 'my_keyspace',
        });
        await client.connect();
        return client;
      },
    },
    ScyllaService,
  ],
  exports: [ScyllaService],
})
export class ScyllaModule {}
