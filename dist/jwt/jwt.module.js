"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var constants_1 = require("./constants");
var jwt = require("jsonwebtoken");
var jwt_service_1 = require("./jwt.service");
var JwtModule = /** @class */ (function () {
    function JwtModule() {
    }
    JwtModule_1 = JwtModule;
    JwtModule.register = function (jwtOpts) {
        return {
            module: JwtModule_1,
            providers: [
                {
                    provide: constants_1.JWT_OPTIONS,
                    useValue: jwtOpts
                }
            ]
        };
    };
    JwtModule.registerAsync = function (opts) {
        return {
            module: JwtModule_1,
            providers: [
                {
                    provide: constants_1.JWT_OPTIONS,
                    useFactory: opts.useFactory,
                    inject: opts.inject || []
                }
            ]
        };
    };
    var JwtModule_1;
    JwtModule = JwtModule_1 = __decorate([
        common_1.Module({
            providers: [
                {
                    provide: constants_1.JWT,
                    useValue: jwt
                },
                jwt_service_1.JwtService
            ],
            exports: [jwt_service_1.JwtService]
        })
    ], JwtModule);
    return JwtModule;
}());
exports.JwtModule = JwtModule;
exports.default = JwtModule;
