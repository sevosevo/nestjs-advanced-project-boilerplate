import { Module, DynamicModule, Global } from '@nestjs/common';
import { JWT, JWT_OPTIONS } from './constants';
import * as jwt from 'jsonwebtoken';
import { JwtOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Global()
@Module({
    providers: [
        {
            provide: JWT,
            useValue: jwt
        },
        JwtService
    ],
    exports: [JwtService]
})
export class JwtModule {
    static register(jwtOpts: JwtOptions): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                {
                    provide: JWT_OPTIONS,
                    useValue: jwtOpts
                }
            ]
        }
    }
    static registerAsync(opts: any): DynamicModule  {
        return {
            module: JwtModule,
            providers: [
                {
                    provide: JWT_OPTIONS,
                    useFactory: opts.useFactory,
                    inject: opts.inject || []
                }
            ]
        }
    }   
}
export default JwtModule;