import { Injectable, Inject } from '@nestjs/common';
import { JwtOptions } from './jwt.interfaces';
import { JWT_OPTIONS, JWT } from './constants';
import * as JsonWebToken from 'jsonwebtoken';

@Injectable()
export class JwtService {
    constructor(
        @Inject(JWT) private readonly jwt: typeof JsonWebToken,
        @Inject(JWT_OPTIONS) private readonly jwtOpts: JwtOptions
    ) { }
    sign(payload: any, expiresIn ?: string): string {
        return this.jwt.sign(payload, this.jwtOpts.secret, {
            expiresIn: expiresIn || this.jwtOpts.expiresIn
        });
    }
    decode(payload: string) {
        return this.jwt.decode(payload);
    }
    verify(payload: string) {
        return this.jwt.verify(payload, this.jwtOpts.secret);
    }
}
export default JwtService;