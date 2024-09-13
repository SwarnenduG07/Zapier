"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupSchema = zod_1.default.object({
    username: zod_1.default.string().min(5),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().min(3)
});
exports.SigninSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
