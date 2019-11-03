import { Module, Type, DynamicModule, Provider, Options, Global } from "@nestjs/common";
import { getConnectionName } from "./common/utils";
import { ValueProvider } from "@nestjs/common/interfaces";
import { async } from "rxjs/internal/scheduler/async";

@Global()
@Module({})
export class ComplexCoreModule {
    static forRoot(
        opts: any
    ): DynamicModule {
        const connectionName = getConnectionName(opts.connectionName);
        const connectionNameProvider: ValueProvider<typeof connectionName> = {
            provide: 'CONNECTION_NAME',
            useValue: connectionName
        }
        const connectionProvider = {
            provide: connectionName,
            useFactory: () => {
                return {
                    connection: {status: opts.id || 'Fake connection'}
                }
            }
        }
        return {
            module: ComplexCoreModule,
            providers: [connectionProvider, connectionNameProvider],
            exports: [connectionProvider]
        }
    }

    static forRootAsync(
        opts: any
    ): DynamicModule {
        const connectionName = getConnectionName(opts.connectionName);
        const connectionNameProvider: ValueProvider<typeof connectionName> = {
            provide: 'CONNECTION_NAME',
            useValue: connectionName
        }
        const connectionProvider: Provider<any> = {
            provide: connectionName,
            useFactory: (options: any) => {
                return {
                    connection: {status: options.id || 'fake conn'}
                }
            },
            inject: ['OPTIONS']
        }
        const providers: Provider<any> = this.createAsyncOptionsProvider(opts);
        return {
            module: ComplexCoreModule,
            providers: [providers, connectionProvider, connectionNameProvider],
            exports: [connectionProvider]
        }
    }   

    private static createAsyncOptionsProvider (
        opts: any
    ) : Provider<any>{
       if(opts.useFactory) {
           return {
               provide: 'OPTIONS',
               useFactory: opts.useFactory,
               inject: opts.inject || []
           }
       }
       const inject = [opts.useClass || opts.useExisting];
       return {
           provide: 'OPTIONS',
           useFactory: (opts: any) => {
            return opts.createOptions();
           },
           inject
       }
    }
}



