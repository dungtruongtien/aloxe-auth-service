"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRootRoute = void 0;
var express_1 = __importDefault(require("express"));
var user_account_route_1 = require("./user_account.route");
var createRootRoute = function () {
    var router = express_1.default.Router();
    router.use('/auth', (0, user_account_route_1.createAuthRoute)());
    return router;
};
exports.createRootRoute = createRootRoute;
//# sourceMappingURL=api.route.js.map