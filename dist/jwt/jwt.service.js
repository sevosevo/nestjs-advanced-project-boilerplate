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
var constants_1 = require("./constants");
var JwtService = /** @class */ (function () {
    function JwtService(jwt, jwtOpts) {
        this.jwt = jwt;
        this.jwtOpts = jwtOpts;
    }
    JwtService.prototype.sign = function (payload, expiresIn) {
        return this.jwt.sign(payload, this.jwtOpts.secret, {
            expiresIn: expiresIn || this.jwtOpts.expiresIn
        });
    };
    JwtService.prototype.decode = function (payload) {
        return this.jwt.decode(payload);
    };
    JwtService.prototype.verify = function (payload) {
        return this.jwt.verify(payload, this.jwtOpts.secret);
    };
    JwtService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(constants_1.JWT)),
        __param(1, common_1.Inject(constants_1.JWT_OPTIONS)),
        __metadata("design:paramtypes", [Object, Object])
    ], JwtService);
    return JwtService;
}());
exports.JwtService = JwtService;
exports.default = JwtService;
