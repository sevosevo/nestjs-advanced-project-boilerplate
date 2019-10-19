import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeSpaModule } from './serve-spa/serve-spa.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { JwtModule } from './jwt/jwt.module';

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
        })
    ]
})
export class AppModule {}
export default AppModule;