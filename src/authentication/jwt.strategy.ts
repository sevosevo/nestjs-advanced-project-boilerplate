import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import ConfigService from "../config/config.service";
import UserService from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    public constructor(
        readonly configService: ConfigService,
        private readonly user: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: any) {
        return await this.user.findById(payload.sub);
    }
}
export default JwtStrategy;