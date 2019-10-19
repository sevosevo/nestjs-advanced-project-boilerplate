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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var express_1 = require("express");
var serve_spa_constants_1 = require("./serve-spa.constants");
var ServeStaticService = /** @class */ (function () {
    function ServeStaticService(httpAdapterHost, options) {
        this.httpAdapterHost = httpAdapterHost;
        this.options = options;
    }
    ServeStaticService.prototype.register = function () {
        var httpAdapter = this.httpAdapterHost.httpAdapter;
        ;
        var app = httpAdapter.getInstance();
        var endpoints = this.options.endpoints;
        var rootPath = this.options.rootPath;
        var path = this.createPath(rootPath);
        if (this.options.env === 'production') {
            app.use(express_1.static(rootPath));
            app.get(endpoints, function (request, response) {
                response.sendFile(path);
            });
        }
    };
    ServeStaticService.prototype.createPath = function (rootPath) {
        return require('path').join(rootPath, 'index.html');
    };
    ServeStaticService = __decorate([
        common_1.Injectable(),
        __param(1, common_1.Inject(serve_spa_constants_1.SERVE_SPA_OPTIONS)),
        __metadata("design:paramtypes", [core_1.HttpAdapterHost, Object])
    ], ServeStaticService);
    return ServeStaticService;
}());
exports.ServeStaticService = ServeStaticService;
