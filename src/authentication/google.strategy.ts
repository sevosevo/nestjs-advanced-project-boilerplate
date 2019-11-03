import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-google-oauth2'
import ConfigService from "../config/config.service";
import { Request } from "express";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    public constructor(
        readonly configService: ConfigService
    ) {
        super({
            clientID: configService.get('CLIENT_ID'),
            clientSecret: configService.get('CLIENT_SECRET'),
            callbackURL: configService.get('REDIRECT_URI'),
            passReqToCallback: true
        });
    }

    async validate(request: Request, accessToken: string, refreshToken: string, profile: any, done: Function) {
        //Here you can add logic for storing accessToken and refreshToken
        return {userId: profile.id}
    }
}
export default GoogleStrategy;

