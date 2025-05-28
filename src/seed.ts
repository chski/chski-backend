import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  // Create an application context (no HTTP server)
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const usersService = appContext.get(UsersService);

  // Mock user data
  const mockUsers = [
    { username: 'alice', password: 'alice123' },
    { username: 'bob', password: 'bob123' },
    { username: 'carol', password: 'carol123' },
  ];

  for (const user of mockUsers) {
    try {
      const created = await usersService.create(user.username, user.password);
      console.log(`Created user: ${created.username}`);
    } catch (err) {
      console.warn(`Failed to create ${user.username}:`, err.message);
    }
  }

  await appContext.close();
  process.exit(0);
}

bootstrap();
