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
var nodemailer = require('nodemailer');
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
/*export const PasswordRecovery = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {name, description, price, image} = req.body;
        const response = await pool.query('INSERT INTO order (name, description, price, image)' +
            ' VALUES ($1 , $2, $3, $4)', [name, description, price, image])
        return res.status(500).json({
            message: 'Product added',
            body:{
                user:{
                    name
                }
            }
        })
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}*/
// @ts-ignore
exports.PasswordRecovery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "lowlowburger@gmail.com",
                pass: "Mr.cruji42"
            }
        });
        var options = {
            from: "Remitente",
            to: email,
            subject: "Cambio de contraseña",
            text: "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <link rel=\"stylesheet\" href=\"..\templates\recover.css\">\n" +
                "    <title>Reset Password</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<div class=\"container\">\n" +
                "    <div class=\"card\">\n" +
                "        <p class=\"title\">Recuperación de contraseña</p>\n" +
                "        <br>\n" +
                "        <img src=\"https://firebasestorage.googleapis.com/v0/b/lowlowburger.appspot.com/o/fast-food.png?alt=media&token=63594e85-5321-431b-b544-9fa33aa9b79c\">\n" +
                "        <br>\n" +
                "        <p>Hola</p>\n" +
                "        <p>Has solicitado un cambio de contraseña.</p>\n" +
                "        <br>\n" +
                "        <button class=\"button\">Cambiar Contraseña</button>\n" +
                "        <p>Si no has sido tú el que solicitó el cambio, ignora este mensaje</p>\n" +
                "    </div>\n" +
                "</div>\n" +
                "</body>\n" +
                "</html>"
        };
        transporter.sendMail(options);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
