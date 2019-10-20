import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AuthenticationService from './authentication.service';
import { AuthenticationValidationResponse } from './authentication.interfaces';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login'){
    constructor(
        private readonly authService: AuthenticationService
    ) {
        super({usernameField: 'email', passwordField: 'password'});
    }
    async validate(email: string, password: string): Promise<AuthenticationValidationResponse>{
        const validation = await this.authService.validateUserForLogin(email, password);
        return validation;
    }
};
export default LoginStrategy;