"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScyllaService = void 0;
const common_1 = require("@nestjs/common");
const cassandra_driver_1 = require("cassandra-driver");
let ScyllaService = class ScyllaService {
    client;
    constructor(client) {
        this.client = client;
    }
    async query(cql, params = []) {
        const result = await this.client.execute(cql, params, { prepare: true });
        return result.rows;
    }
    async insert(table, data) {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        await this.client.execute(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, Object.values(data), { prepare: true });
    }
    async disconnect() {
        await this.client.shutdown();
    }
};
exports.ScyllaService = ScyllaService;
exports.ScyllaService = ScyllaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SCYLLA_CONNECTION')),
    __metadata("design:paramtypes", [cassandra_driver_1.Client])
], ScyllaService);
//# sourceMappingURL=scylla.service.js.map