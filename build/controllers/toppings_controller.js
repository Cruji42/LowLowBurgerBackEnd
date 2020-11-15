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
exports.deleteToppings = exports.updateToppings = exports.createToppings = exports.getToppingsbyId = exports.getToppings = void 0;
const database_1 = require("../enviroment/database");
exports.getToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM toppings');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.getToppingsbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const response = yield database_1.pool.query('SELECT * FROM toppings WHERE id= $1', [Id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.createToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        const response = yield database_1.pool.query('INSERT INTO toppings (name, price)' +
            ' VALUES ($1 , $2)', [name, price]);
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
exports.updateToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const { name, description, price, image } = req.body;
        const response = yield database_1.pool.query('UPDATE toppings SET name= $1, price= $2,' +
            'WHERE id = $3', [name, price, Id]);
        return res.json({
            message: 'Product updated',
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
exports.deleteToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const response = yield database_1.pool.query('DELETE FROM toppings WHERE id= $1', [Id]);
        return res.json('Product ${Id} deleted');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
