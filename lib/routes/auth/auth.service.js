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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
class AuthService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    insertUser(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.create({
                    data: {
                        id,
                        email,
                        role_id: "7281bb2e-7f8e-4d02-9539-edba4ad8f456",
                        password: ""
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
            finally {
                yield this.prisma.$disconnect();
            }
        });
    }
}
exports.AuthService = AuthService;
