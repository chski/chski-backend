"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
async function bootstrap() {
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = appContext.get(users_service_1.UsersService);
    const mockUsers = [
        { username: 'alice', password: 'alice123' },
        { username: 'bob', password: 'bob123' },
        { username: 'carol', password: 'carol123' },
    ];
    for (const user of mockUsers) {
        try {
            const created = await usersService.create(user.username, user.password);
            console.log(`Created user: ${created.username}`);
        }
        catch (err) {
            console.warn(`Failed to create ${user.username}:`, err.message);
        }
    }
    await appContext.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=seed.js.map