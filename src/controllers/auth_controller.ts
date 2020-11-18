import {Request, Response} from 'express'
import {pool} from '../enviroment/database'
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;


// @ts-ignore
export const Login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password} = req.body;
        let passwordencrypted = '';
        // const response: QueryResult = await pool.query('SELECT * FROM users where email = $1',
        //     [email]);
    await pool.query('SELECT * FROM users where email = $1',
            [email]).then(response => {
        passwordencrypted = response.rows[0]['password'];
        if(response.rowCount == 1){
            bcrypt.compare(password, passwordencrypted).then((result: boolean) => {
                if(result){
                    return res.status(200).json(response.rows);
                }else {
                    return res.status(500).json('Password Incorrect');
                }
            });
        }else {
            return res.status(500).json('User not found');
        }
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

export const Register = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {name, last_name, address, email, password, phone_number} = req.body;
        const passwordEncrypted = await bcrypt.hash(password, 10);
        const response = await pool.query('INSERT INTO users (name, last_name, address, email, password,' +
            ' phone_number) VALUES ($1 , $2, $3, $4, $5, $6)', [name, last_name, address, email, passwordEncrypted, phone_number])
        return res.status(500).json({
            message: 'User created',
            body:{
                user:{
                    name,
                    last_name
                }
            }
        })
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

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
export const PasswordRecovery = async (req: Request, res: Response): Promise<Response> => {
    try{
        const {email} = req.body;
        var transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:"lowlowburger@gmail.com",
                pass:"Mr.cruji42"
            }
        });

        var sendPwdReminder = transporter.templateSender(new EmailTemplate('../templates/passwordForm.html'), {
            from: "Low Low Burger",
        });

        sendPwdReminder({
            to: email,
            subject: "Cambio de contraseña",
        }, {
            user:"lowlowburger@gmail.com",
            pass:"Mr.cruji42"
        });

        /*var options = {
            from: "Low Low Burger",
            to: email,
            subject: "Cambio de contraseña",
            text:template
        }
        transporter.sendMail(options);*/
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

