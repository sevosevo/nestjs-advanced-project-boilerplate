import { Module, DynamicModule } from '@nestjs/common';
import { ServeSpaOptions, ServeSpaModuleOpts } from './serve.spa.interfaces';
import { SERVE_SPA_OPTIONS } from './serve-spa.constants';
import { ServeStaticService } from './serve-spa.service';

@Module({})
export class ServeSpaModule {
    public constructor(
        private readonly serveStaticService: ServeStaticService
    ) { }

    static forRoot(options: ServeSpaOptions): DynamicModule {
        return {
            module: ServeSpaModule,
            providers: [
                {
                    provide: SERVE_SPA_OPTIONS,
                    useValue: options
                }, 
                ServeStaticService
            ] 
        }
    }
    static forRootAsync(options: ServeSpaModuleOpts): DynamicModule {
        return {
            module: ServeSpaModule,
            providers: [
                {
                    provide: SERVE_SPA_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                ServeStaticService
            ]
        }
    }
    onModuleInit() {
        this.serveStaticService.register();
    }
}
export default ServeSpaModule;