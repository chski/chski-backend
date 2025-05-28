import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    create(username: string, password: string): Promise<User>;
    findAll(): Promise<User[]>;
}
