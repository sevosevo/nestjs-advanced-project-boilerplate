import { Controller, Post, UsePipes, ValidationPipe, Body, Req, ConflictException, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

type TokenResponse = Promise<{token: string}>;

@Controller('/api/auth')
export class AuthenticationController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    @Post('/register')
    @UseGuards(AuthGuard('register'))
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
    
}