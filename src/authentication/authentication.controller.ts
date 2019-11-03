import { Controller, Post, UseFilters, UsePipes, ValidationPipe, Body, Req, ConflictException, UseGuards, ForbiddenException, Get, Res, Next } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import * as passport from 'passport';
import { Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';
import ConfigService from '../config/config.service';
import { ExceptionHandler } from '../errorHandler/exception.handler';

type TokenResponse = Promise<{token: string}>;

@UseFilters(new ExceptionHandler())
@Controller('/api/auth')
export class AuthenticationController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) { }

    @Post('/register')
    @UsePipes(new ValidationPipe({transform: true}))
    async register(@Body() userDTO: UserDTO, @Req() req: Request) {
        if(req.user.success) {
            const user = await this.userService.createUser(userDTO);
            return user;
        }else{
            throw new ConflictException(req.user.message);
        }
    }

    @Post('/login')
    @UseGuards(AuthGuard('login'))
    async login(@Req() req: Request): TokenResponse {
        if(req.user.success) {
            const payload = {
                iss: 'Nestjs application',
                sub: req.user.message,
                iat: new Date().getTime()
            }
            const token = await this.jwtService.sign(payload);
            return { token };
        }else{
            throw new ForbiddenException(req.user.message);
        }
    }

    @Get('/google/redirect')
    handleGoogle(
        @Req() req: Request
    ) {
        //If you are using SPA then you would sign jwt from req.user and put it in cookie
        return req.user; 
    }

    /*

        Test route
    */
    @Get('/priv')
    @UseGuards(AuthGuard('jwt'))
    private(@Req() req: Request) {
        console.log(req.user);
        return 'access given';
    }

}