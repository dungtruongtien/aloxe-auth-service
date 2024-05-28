"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountService = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var constant_1 = require("../../common/constant");
var custom_error_1 = require("../../common/custom_error");
var ROLE_MAPPING_STR = {
    1: 'STAFF',
    2: 'CUSTOMER',
    3: 'DRIVER'
};
var UserAccountService = (function () {
    function UserAccountService(userAccountRepo, userRepo) {
        this.userAccountRepo = userAccountRepo;
        this.userRepo = userRepo;
    }
    UserAccountService.prototype.login = function (phoneNumber, password) {
        return __awaiter(this, void 0, void 0, function () {
            var existsUserAccount, isEqual, userData, accessTokenPayload, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userAccountRepo.getUserAccount(phoneNumber)];
                    case 1:
                        existsUserAccount = _a.sent();
                        if (!existsUserAccount) {
                            throw new custom_error_1.NotfoundError('Invalid login credential', 'AuthenticationError');
                        }
                        isEqual = bcryptjs_1.default.compareSync(password, existsUserAccount.password);
                        if (!isEqual) {
                            throw new custom_error_1.BadRequestError('Invalid login credential');
                        }
                        return [4, this.userRepo.getUser(existsUserAccount.userId)];
                    case 2:
                        userData = _a.sent();
                        if (!userData) {
                            throw new custom_error_1.BadRequestError('Invalid login credential');
                        }
                        accessTokenPayload = {
                            accountId: existsUserAccount.id,
                            user: {
                                id: userData.id
                            },
                            customer: userData.customer ? { id: userData.customer.id } : {},
                            driver: userData.driver ? { id: userData.driver.id } : {},
                            staff: userData.staff ? { id: userData.staff.id } : {}
                        };
                        accessToken = jsonwebtoken_1.default.sign(accessTokenPayload, constant_1.AUTH_ACCESS_SERCRET_KEY);
                        return [2, {
                                accessToken: accessToken,
                                phoneNumber: userData.fullName,
                                fullName: userData.fullName,
                                userId: userData.id,
                                role: ROLE_MAPPING_STR[userData.role],
                                customerId: userData.customer ? userData.customer.id : 0,
                                driverId: userData.driver ? userData.driver.id : 0,
                                staffId: userData.staff ? userData.staff.id : 0
                            }];
                }
            });
        });
    };
    UserAccountService.prototype.createUserAccount = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var createUserAccountDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createUserAccountDto = {
                            username: input.username,
                            password: input.password,
                            userId: input.userId
                        };
                        return [4, this.userAccountRepo.createUserAccount(createUserAccountDto)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return UserAccountService;
}());
exports.UserAccountService = UserAccountService;
//# sourceMappingURL=user_account.service.js.map