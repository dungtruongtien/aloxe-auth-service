"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoute = void 0;
var express_1 = __importDefault(require("express"));
var account_controller_rest_1 = __importDefault(require("../controller/account.controller.rest"));
var createAuthRoute = function () {
    var router = express_1.default.Router();
    var userController = new account_controller_rest_1.default();
    router.post('/', userController.createUserAccount.bind(userController));
    router.post('/login', userController.login.bind(userController));
    return router;
};
exports.createAuthRoute = createAuthRoute;
//# sourceMappingURL=user_account.route.js.map