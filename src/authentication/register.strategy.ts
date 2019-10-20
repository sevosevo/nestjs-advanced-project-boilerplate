import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationValidationResponse } from './authentication.interfaces';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register'){
    constructor(
        private readonly authService: AuthenticationService
    ) {
        super({usernameField: 'email', passwordField: 'password'});
    }
    async validate(email: string): Promise<AuthenticationValidationResponse>{
        const validation = await this.authService.validateUserForRegister(email);
        return validation;
    }
};
export default RegisterStrategy;