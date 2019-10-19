import { IsString, MinLength, MaxLength } from 'class-validator';
import { notStringError, minLengthStringError, maxLengthStringError } from '../validationErrors';

export class UserDTO {
    @IsString({message: notStringError})
    @MinLength(8, {message: minLengthStringError})
    @MaxLength(36, {message: maxLengthStringError})
    username !: string;
    @IsString({message: notStringError})
    @MinLength(8, {message: minLengthStringError})
    @MaxLength(65, {message: maxLengthStringError}) 
    password !: string;
    @IsString({message: notStringError})
    email !: string;
};

export default UserDTO;