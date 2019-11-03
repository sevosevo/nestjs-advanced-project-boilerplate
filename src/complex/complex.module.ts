import { Module, DynamicModule } from "@nestjs/common";
import { ComplexCoreModule } from "./complex-core.module";


@Module({})
export class ComplexModule {
    static forRoot(
        name: string,
        options: any
    ): DynamicModule {
        return {
            module: ComplexModule,
            imports: [ComplexCoreModule.forRoot({...options, connectionName: name})]
        }
    };
    static forRootAsync(
        options: any
    ): DynamicModule {
        return {
            module: ComplexModule,
            imports: [ComplexCoreModule.forRootAsync({...options})]
        }
    }
}