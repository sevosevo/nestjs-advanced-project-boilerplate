import { Module, Inject } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeSpaModule } from './serve-spa/serve-spa.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { JwtModule } from './jwt/jwt.module';
import AuthenticationModule from './authentication/authentication.module';

import { ComplexModule, InjectConnection } from './complex';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get('JWT_SECRET'),
                    expiresIn: config.get('EXPIRES_IN')
                }
            },
            inject: [ConfigService]
        }),
        ServeSpaModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                return { 
                    endpoints: config.get('ENDPOINTS'),
                    rootPath: config.get('ROOT_PATH'),
                    env: config.get('ENV')
                }
            },
            inject: [ConfigService]
        }),
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                return {
                    uri: config.get('MONGODB_URI'),
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                }
            },
            inject: [ConfigService]
        }),
        AuthenticationModule,
        ComplexModule.forRootAsync({
            connectionName: 'Vukasinova baza',
            useClass: ConfigService
        })
    ]
})
export class AppModule { 
    constructor(
        @InjectConnection('Vukasinova baza') baza: any
     ) {
        console.log(baza);
    }
}
export default AppModule;