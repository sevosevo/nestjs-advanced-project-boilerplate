import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() 
export class ExceptionHandler implements ExceptionFilter { 
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>(); 
		//Get status
		const status = exception.getStatus();
		let errResponse: any = exception.getResponse();
		
		//If error came from class validator
		if(errResponse.message instanceof Array) {
			const errors: string[] = []
			errors.push(... (errResponse.message.map((err: any) => Object.values(err.constraints)) ).flat(2) );
			errResponse.message = errors;
		}

		response.status(status).json(errResponse);

	}
};
export default ExceptionHandler;