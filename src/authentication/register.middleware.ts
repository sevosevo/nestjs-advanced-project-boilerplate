import { Injectable, NestMiddleware, UnprocessableEntityException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import * as passport from 'passport';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('register', {session: false}, function(err, user, info) {
            console.log(err);
            if ( err ) return next(err);
            if( !user ) return next( new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: 'UnprocessableEntityException',
                    message: ['All fields are required']
                })
            );
            req.logIn(user, {session: false}, function(err){
                if(err) return next(err);
                return next();
            });
        })(req, res, next);
    }
};
