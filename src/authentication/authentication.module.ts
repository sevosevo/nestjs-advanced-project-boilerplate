import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { LoginStrategy } from './login.strategy';
import { RegisterStrategy } from './register.strategy';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { RegisterMiddleware } from './register.middleware';
import { GoogleRedirect, GoogleAuthStart } from './google.middleware';

@Module({
    imports: [PassportModule, UserModule],
    providers: [AuthenticationService, LoginStrategy, RegisterStrategy, JwtStrategy, GoogleStrategy],
    controllers: [AuthenticationController]
})
export class AuthenticationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        //Apply middleware for running passport on /api/auth/register route
        consumer.apply(RegisterMiddleware).forRoutes('/api/auth/register');
        //Apply middleware for google passport
        consumer.apply(GoogleAuthStart).forRoutes({ method: RequestMethod.GET, path: '/api/auth/google' });
        consumer.apply(GoogleRedirect).forRoutes('/api/auth/redirect');
    }
}
export default AuthenticationModule;