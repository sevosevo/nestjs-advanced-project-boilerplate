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
var user_schema_1 = require("./user.schema");
var user_controller_1 = require("./user.controller");
var user_service_1 = require("./user.service");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: 'users', schema: user_schema_1.UserSchema }])
            ],
            providers: [user_service_1.UserService],
            controllers: [user_controller_1.UserController],
            exports: [mongoose_1.MongooseModule, user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
exports.default = UserModule;
