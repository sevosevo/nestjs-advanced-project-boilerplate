"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var path = require("path");
var dotenv = require("dotenv");
dotenv.config();
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.config = {
            mongodb_uri: process.env.mongodb_uri,
            node_env: process.env.NODE_ENV,
            endpoints: ['app', 'app/*'],
            root_path: path.join(__dirname, '../', '/client', '/public'),
            expires_in: '1h',
            jwt_secret: 'randomstring'
        };
    }
    ConfigService.prototype.get = function (field) {
        var f = field.toLowerCase();
        return this.config[f];
    };
    ConfigService.prototype.set = function (field, value) {
        var f = field.toLowerCase();
        this.config[f] = value;
    };
    ConfigService = __decorate([
        common_1.Injectable()
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
;
exports.default = ConfigService;
