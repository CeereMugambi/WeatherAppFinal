import { IRole} from './role';

export class IAccount {
    id?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: IRole;
    jwtToken?: string;
}