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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductbyId = exports.getProducts = void 0;
const database_1 = require("../enviroment/database");
exports.getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const response = yield database_1.pool.query('SELECT * FROM products');
        console.log(response.rows);
        return res.status(200).json({
            "result": response.rows
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.getProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const response = yield database_1.pool.query('SELECT * FROM products WHERE id= $1', [Id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image } = req.body;
        const response = yield database_1.pool.query('INSERT INTO products (name, description, price, image)' +
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
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const { name, description, price, image } = req.body;
        const response = yield database_1.pool.query('UPDATE products SET name= $1, description= $2, price= $3, image = $4 ' +
            'WHERE id = $5', [name, description, price, image, Id]);
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
exports.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const response = yield database_1.pool.query('DELETE FROM products WHERE id= $1', [Id]);
        return res.json('Product ${Id} deleted');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
