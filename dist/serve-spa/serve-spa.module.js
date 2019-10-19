"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var serve_spa_constants_1 = require("./serve-spa.constants");
var serve_spa_service_1 = require("./serve-spa.service");
var ServeSpaModule = /** @class */ (function () {
    function ServeSpaModule(serveStaticService) {
        this.serveStaticService = serveStaticService;
    }
    ServeSpaModule_1 = ServeSpaModule;
    ServeSpaModule.forRoot = function (options) {
        return {
            module: ServeSpaModule_1,
            providers: [
                {
                    provide: serve_spa_constants_1.SERVE_SPA_OPTIONS,
                    useValue: options
                },
                serve_spa_service_1.ServeStaticService
            ]
        };
    };
    ServeSpaModule.forRootAsync = function (options) {
        return {
            module: ServeSpaModule_1,
            providers: [
                {
                    provide: serve_spa_constants_1.SERVE_SPA_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                serve_spa_service_1.ServeStaticService
            ]
        };
    };
    ServeSpaModule.prototype.onModuleInit = function () {
        this.serveStaticService.register();
    };
    var ServeSpaModule_1;
    ServeSpaModule = ServeSpaModule_1 = __decorate([
        common_1.Module({}),
        __metadata("design:paramtypes", [serve_spa_service_1.ServeStaticService])
    ], ServeSpaModule);
    return ServeSpaModule;
}());
exports.ServeSpaModule = ServeSpaModule;
exports.default = ServeSpaModule;
