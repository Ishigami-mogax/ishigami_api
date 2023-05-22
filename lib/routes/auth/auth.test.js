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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lab_1 = __importDefault(require("@hapi/lab"));
const server_1 = require("../../server");
const client_1 = require("@prisma/client");
const code_1 = require("@hapi/code");
const prisma = new client_1.PrismaClient();
const lab = exports.lab = lab_1.default.script();
lab.describe('POST /register', () => {
    let server;
    let fakeData;
    lab.before(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield (0, server_1.init)();
        fakeData = {
            "id": "38ef649f-10bd-4f94-88d3-81396bb36eb4",
            "email": "pihihv",
            "password": "",
            "createdAt": null,
            "role_id": "7281bb2e-7f8e-4d02-9539-edba4ad8f456"
        };
        yield prisma.role.create({
            data: {
                id: '7281bb2e-7f8e-4d02-9539-edba4ad8f456',
                name: 'Member'
            }
        });
    }));
    lab.after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany();
        yield prisma.role.deleteMany();
        yield server.stop();
    }));
    lab.it('Add an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: 'POST',
            url: '/register',
            payload: fakeData
        });
        (0, code_1.expect)(res.statusCode).to.equal(200);
        (0, code_1.expect)(res.result).to.be.an.object();
        (0, code_1.expect)(res.result).to.equal(fakeData);
    }));
});
