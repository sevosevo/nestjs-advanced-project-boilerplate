import { Injectable, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ServeSpaOptions } from './serve.spa.interfaces';
import { Request, Response, static as serve } from 'express'; 
import { SERVE_SPA_OPTIONS } from './serve-spa.constants';

@Injectable()
export class ServeStaticService {
    public constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        @Inject(SERVE_SPA_OPTIONS)
        private readonly options: ServeSpaOptions
    ) {}
    register(): void {
        const httpAdapter = this.httpAdapterHost.httpAdapter;;
        const app = httpAdapter.getInstance();
        const endpoints = this.options.endpoints;
        const rootPath = this.options.rootPath;
        const path = this.createPath(rootPath);
        if(this.options.env === 'production') {
            app.use(serve(rootPath));
            app.get(endpoints, (request: Request, response: Response) => {
                response.sendFile(path);
            });
        }
    }
    createPath(rootPath: string): string {
        return require('path').join(rootPath, 'index.html');
    }
}