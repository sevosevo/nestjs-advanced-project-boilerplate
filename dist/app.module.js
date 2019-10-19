"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var serve_spa_module_1 = require("./serve-spa/serve-spa.module");
var config_module_1 = require("./config/config.module");
var config_service_1 = require("./config/config.service");
var jwt_module_1 = require("./jwt/jwt.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_module_1.ConfigModule,
                jwt_module_1.JwtModule.registerAsync({
                    useFactory: function (config) {
                        return {
                            secret: config.get('JWT_SECRET'),
                            expiresIn: config.get('EXPIRES_IN')
                        };
                    },
                    inject: [config_service_1.ConfigService]
                }),
                serve_spa_module_1.ServeSpaModule.forRootAsync({
                    useFactory: function (config) {
                        return {
                            endpoints: config.get('ENDPOINTS'),
                            rootPath: config.get('ROOT_PATH'),
                            env: config.get('ENV')
                        };
                    },
                    inject: [config_service_1.ConfigService]
                }),
                mongoose_1.MongooseModule.forRootAsync({
                    useFactory: function (config) {
                        return {
                            uri: config.get('MONGODB_URI'),
                            useUnifiedTopology: true,
                            useNewUrlParser: true
                        };
                    },
                    inject: [config_service_1.ConfigService]
                })
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
exports.default = AppModule;
