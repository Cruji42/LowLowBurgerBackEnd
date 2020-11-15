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
exports.PasswordRecovery = exports.Register = exports.Login = void 0;
const database_1 = require("../enviroment/database");
const bcrypt = require('bcrypt');
// @ts-ignore
exports.Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let passwordencrypted = '';
        // const response: QueryResult = await pool.query('SELECT * FROM users where email = $1',
        //     [email]);
        yield database_1.pool.query('SELECT * FROM users where email = $1', [email]).then(response => {
            passwordencrypted = response.rows[0]['password'];
            if (response.rowCount == 1) {
                bcrypt.compare(password, passwordencrypted).then((result) => {
                    if (result) {
                        return res.status(200).json(response.rows);
                    }
                    else {
                        return res.status(500).json('Password Incorrect');
                    }
                });
            }
            else {
                return res.status(500).json('User not found');
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, last_name, address, email, password, phone_number } = req.body;
        const passwordEncrypted = yield bcrypt.hash(password, 10);
        const response = yield database_1.pool.query('INSERT INTO users (name, last_name, address, email, password,' +
            ' phone_number) VALUES ($1 , $2, $3, $4, $5, $6)', [name, last_name, address, email, passwordEncrypted, phone_number]);
        return res.status(500).json({
            message: 'User created',
            body: {
                user: {
                    name,
                    last_name
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.PasswordRecovery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image } = req.body;
        const response = yield database_1.pool.query('INSERT INTO order (name, description, price, image)' +
            ' VALUES ($1 , $2, $3, $4)', [name, description, price, image]);
        return res.status(500).json({
            message: 'Product added',
            body: {
                user: {
                    name
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
