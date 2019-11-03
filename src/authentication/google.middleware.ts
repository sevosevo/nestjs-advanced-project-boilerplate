import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import ConfigService from '../config/config.service';


//We have to use middlewares here because AuthGuard() accepts no options like scope or session
@Injectable()
export class GoogleAuthStart implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService
    ) { }
    use(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('google', {scope: this.configService.get('SCOPE')})(req, res, next);
    }
};

@Injectable()
export class GoogleRedirect implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
    	console.log('got')
        passport.authenticate('google', {session: false})(req, res, next);
    }
}