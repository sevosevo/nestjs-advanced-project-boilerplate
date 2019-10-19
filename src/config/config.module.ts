import { Injectable, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
export default ConfigModule;