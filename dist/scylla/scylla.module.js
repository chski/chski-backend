"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScyllaModule = void 0;
const common_1 = require("@nestjs/common");
const cassandra_driver_1 = require("cassandra-driver");
const scylla_service_1 = require("./scylla.service");
let ScyllaModule = class ScyllaModule {
};
exports.ScyllaModule = ScyllaModule;
exports.ScyllaModule = ScyllaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: 'SCYLLA_CONNECTION',
                useFactory: async () => {
                    const client = new cassandra_driver_1.Client({
                        contactPoints: [process.env.SCYLLA_HOST || '127.0.0.1'],
                        localDataCenter: process.env.SCYLLA_DATACENTER || 'datacenter1',
                        keyspace: process.env.SCYLLA_KEYSPACE || 'my_keyspace',
                    });
                    await client.connect();
                    return client;
                },
            },
            scylla_service_1.ScyllaService,
        ],
        exports: [scylla_service_1.ScyllaService],
    })
], ScyllaModule);
//# sourceMappingURL=scylla.module.js.map