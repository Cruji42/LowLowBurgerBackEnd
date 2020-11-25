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
exports.PasswordRecovery = exports.TOKENGENERATE = exports.ResetPassword = exports.Register = exports.Login = void 0;
const database_1 = require("../enviroment/database");
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
const jwt = require("jsonwebtoken");
// @ts-ignore
exports.Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Allow', '*');
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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
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
exports.ResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const { password } = req.body;
        let token = req.params.token;
        const passwordEncrypted = yield bcrypt.hash(password, 10);
        var decoded = jwt.verify(token, 'secret');
        if (decoded) {
            const response = yield database_1.pool.query('UPDATE users SET  password= $1 WHERE email = $2', [passwordEncrypted, decoded.data]);
            return res.status(200).json({
                tokendata: decoded.data
            });
        }
        else {
            return res.status(500).json({
                message: 'Not valid Token'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Not valid Token');
    }
});
exports.TOKENGENERATE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        var token = yield jwt.sign({
            data: 'cruji42@gmail.com'
        }, 'secret', { expiresIn: '15s' });
        return res.status(500).json(token);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('No se puede generar el token');
    }
});
exports.PasswordRecovery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const { email } = req.body;
        const useremail = yield email;
        var token = yield jwt.sign({
            data: useremail
        }, 'secret', { expiresIn: '300s' });
        // Este link sera hacia el formulario enviando el token con el email dentro
        const link = `https://classic.minecraft.net/${token}`;
        let options = {
            from: 'Low Low Burguer',
            to: useremail,
            subject: "Cambio de contraseña",
            html: `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <link rel="stylesheet" href="recover.css"> <title>Reset Password</title> <style>.container{background-color: darkgray; position: fixed; width: 70%; height: 70%; top: 15%; right: 15%;}.card{background-color: white; position: relative; width: 70%; height: 70%; top: 15%; bottom: 15%; left: 15%; right: 15%; box-shadow: 5px 10px #888888;}.card img{width: 30%; height: auto; display: block; position: relative; left: 35%; right: 35%;}.card p{color: black; font-family: "Trebuchet MS", Helvetica, sans-serif; text-align: center;}.title{padding-top: 2%; font-weight: bold; font-size: 16px; margin-left: 10%; margin-right: 10%; width: 80%; text-align: center;}.button{border-radius: 5px; font-weight: bold; font-size: 11px; color: white; text-align: center; margin-left: 35%; margin-right: 35%; width: 30%; transition-duration: 0.4s; cursor: pointer; border: none; text-decoration: none; display: inline-block;}.button1{background-color: #008CBA; color: white; border: 2px solid #008CBA;}.button1:hover{background-color: #57B7EB; color: white;}</style></head><body><div class="container"> <div class="card"> <p class="title">Recuperación de contraseña</p><br><img src="https://firebasestorage.googleapis.com/v0/b/lowlowburger.appspot.com/o/fast-food.png?alt=media&token=63594e85-5321-431b-b544-9fa33aa9b79c"> <p>Has solicitado un cambio de contraseña.</p><a class="title" href=\"${link}\" >Click aqui para cambiar contraseña</a> <p>Si no has sido tú el que solicitó el cambio, ignora este mensaje</p></div></div></body></html>`
        };
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "lowlowburger@gmail.com",
                pass: "Mr.cruji42"
            }
        });
        transporter.use('compile', htmlToText());
        yield transporter.sendMail(options);
        return res.status(200).json('Correo enviado');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
