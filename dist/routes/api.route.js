"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_account_route_1 = __importDefault(require("./user_account.route"));
var router = express_1.default.Router();
router.use('/user_accounts', user_account_route_1.default);
exports.default = router;
//# sourceMappingURL=api.route.js.map