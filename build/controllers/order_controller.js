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
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderbyId = exports.getOrders = void 0;
const database_1 = require("../enviroment/database");
exports.getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM public.order');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.getOrderbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const response = yield database_1.pool.query('SELECT t1.image, t1.name,t2.amount, t1.price*t2.amount as sub_total from products as t1\n' +
            'join order_item as t2 on t1.id = t2.products_id where t2.order_id= $1', [Id]);
        return res.json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, products } = req.body;
        /*this is how the function call looks like
        select Make_Order(2,Array[
            row(1,'Instruccion 1',1,'{1,3,5}'),
                row(2,'Instruccion 1',2,'{1,2}')]::order_product[])*/
        let arraySize = products.length - 1;
        let product = '';
        if (arraySize == 1) {
            product = `row( ${products[0].amount},'${products[0].instructions}',${products[0].id_product},'{ ${products[0].toppings} }')`;
        }
        else {
            for (let i = 0; i < arraySize; i++) {
                product = product + `row( ${products[i].amount},'${products[i].instructions}',${products[i].id_product},'{ ${products[i].toppings} }'),`;
            }
            product = product + `row( ${products[arraySize].amount},'${products[arraySize].instructions}',${products[arraySize].id_product},'{ ${products[arraySize].toppings} }')`;
        }
        let debug = `SELECT Make_Order(${user}, Array[ ${product} ] ::order_product[])`;
        const response = yield database_1.pool.query(debug);
        return res.status(500).json({
            "message": 'ORDER CREATED',
            "data": debug
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const { name, description, price, image, id } = req.body;
        const response = yield database_1.pool.query('UPDATE products SET name= $1, description= $2, price= $3, image = $4 ' +
            'WHERE id = $5', [name, description, price, image, id]);
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
exports.deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = parseInt(req.params.id);
        const response = yield database_1.pool.query('DELETE FROM order WHERE id= $1', [Id]);
        return res.json('Product ${Id} deleted');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
