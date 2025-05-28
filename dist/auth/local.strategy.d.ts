import { UsersService } from '../users/users.service';
declare const LocalStrategy_base: new (...args: any) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(username: string, password: string): Promise<any>;
}
export {};
