import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import UserDTO from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly user: Model<User>) { } 

    createUser(userDTO: UserDTO): Promise<User> {
        const u = new this.user(userDTO);
        return u.save();
    }
}
export default UserService;