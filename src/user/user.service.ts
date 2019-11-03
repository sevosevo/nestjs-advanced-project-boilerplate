import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import UserDTO from './user.dto';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly user: Model<User>) { } 

    private filterUserFields(user: User, fields: string[]) {
        const u = <User>user.toJSON();
        fields.forEach(field => {
            delete u[field as keyof User];
        });
        return u;
    }

    public async createUser(userDTO: UserDTO, deleteFields: string[] = ['password']): Promise<User> {
        let u = new this.user(userDTO);
        u = await u.save();
        const user = this.filterUserFields(u, deleteFields);
        return user;
    }

    public async findByEmail(email: string, deleteFields: string[] = []): Promise<User | null> {
        let u = await this.user.findOne({ email });
        if(u){
            u = this.filterUserFields(u, deleteFields);
        }
        return u;
    }

    public async findById(id: typeof ObjectId): Promise<User | null> {
        let u = await this.user.findById(id);
        return u;
    }

}
export default UserService;