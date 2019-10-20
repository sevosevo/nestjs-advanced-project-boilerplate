import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import LoginStrategy from './login.strategy';
import RegisterStrategy from './register.strategy';

@Module({
    imports: [PassportModule, UserModule],
    providers: [AuthenticationService, LoginStrategy, RegisterStrategy],
    controllers: [AuthenticationController]
})
export class AuthenticationModule { }
export default AuthenticationModule;