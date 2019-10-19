import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('api/users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    createUser(@Body() userDTO: UserDTO) {
        return this.userService.createUser(userDTO);
    }
}
export default UserController;