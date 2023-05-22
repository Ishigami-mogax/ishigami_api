"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const controller = new auth_controller_1.AuthController();
const authRoute = [
    {
        method: 'POST',
        path: '/register',
        handler: controller.register,
        options: {
            tags: ['api']
        }
    }
];
exports.default = authRoute;
