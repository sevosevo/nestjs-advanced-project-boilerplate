import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthenticationValidationResponse } from './authentication.interfaces';

const wrongCreds: AuthenticationValidationResponse = {
    success: false,
    message: 'Wrong credentials'
};

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService
    ) { }

    public async validateUserForRegister(email: string): Promise<AuthenticationValidationResponse> {
        const user = await this.userService.findByEmail(email, ['password']);
        if( user ) return {
            success: false,
            message: 'Email already in use'
        };
        return {
            success: true
        }
    }
    public async validateUserForLogin(email: string, password: string): Promise<AuthenticationValidationResponse> {
        const user = await this.userService.findByEmail(email);
        if( !user ) return wrongCreds;
        const res = user.password === password;
        if( !res ) return wrongCreds;
        return {
            success: true,
            message: user._id.toString()
        }
    }
}
export default AuthenticationService;