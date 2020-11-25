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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        let data = {
            "orders": {
                "folio": "",
                "user": "",
                "delivery": "",
                "address": "",
                "products": []
            }
        };
        let product = {
            "amount": "",
            "instructions": "",
            "product": "",
            "toppings": []
        };
        let sql = 'Select distinct t5.folio orden, concat(t6.name ||\' \'|| t6.last_name) cliente, t5.delivery_address dirección, t5.delivery_date as fecha, \n' +
            '(select array[t2.amount::text, t1.name, t2.instructions, replace(replace(array_agg(t4.name)::text,\'{\',\'\'),\'}\',\'\') ]) as producto\n' +
            'from products as t1\n' +
            'join order_item as t2 on t1.id = t2.products_id\n' +
            'join order_item_has_toppings t3 on t3.order_item_order_id = t2.id\n' +
            'join toppings as t4 on t4.id = t3.toppings_id\n' +
            'join public.order as t5 on t5.id = t2.order_id\n' +
            'join users as t6 on t6.id = t5.user_id\n' +
            'group by\n' +
            't1.name,\n' +
            't2.amount,\n' +
            't2.instructions,\n' +
            't2.id,\n' +
            't5.folio,\n' +
            't6.name,\n' +
            't5.delivery_address,\n' +
            't5.delivery_date,\n' +
            't6.last_name\n' +
            'order by t5.folio';
        const response = yield database_1.pool.query(sql);
        data['orders']['folio'] = response.rows[0]['orden'];
        data['orders']['user'] = response.rows[0]['cliente'];
        data['orders']['delivery'] = response.rows[0]['fecha'];
        data['orders']['address'] = response.rows[0]['dirección'];
        for (let i = 0; i < response.rowCount; i++) {
            product['amount'] = response.rows[i]['producto'][0];
            product['product'] = response.rows[i]['producto'][1];
            product['instructions'] = response.rows[i]['producto'][2];
            product['toppings'] = response.rows[i]['producto'][3];
            // @ts-ignore
            data[`orders`]['products'][i] = product;
            product = {
                "amount": "",
                "instructions": "",
                "product": "",
                "toppings": []
            };
        }
        /*
                product['amount'] = response.rows[1]['producto'][0];
                product['product'] = response.rows[1]['producto'][1];
                product['instructions'] = response.rows[1]['producto'][2];
                product['toppings'] = response.rows[1]['producto'][3];
        
                data['orders']['products'][1]=  product;*/
        //console.log(product);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.getOrderbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const Id = req.params.id;
        let sql = 'Select distinct t5.folio orden, t6.name cliente, t5.delivery_address dirección, \n' +
            '(select array[t2.amount::text, t1.name, t2.instructions, replace(replace(array_agg(t4.name)::text,\'{\',\'\'),\'}\',\'\') ]) producto\n' +
            'from products as t1\n' +
            'join order_item as t2 on t1.id = t2.products_id\n' +
            'join order_item_has_toppings t3 on t3.order_item_order_id = t2.id\n' +
            'join toppings as t4 on t4.id = t3.toppings_id\n' +
            'join public.order as t5 on t5.id = t2.order_id\n' +
            'join users as t6 on t6.id = t5.user_id\n' +
            'where t5.folio = ' + '\'' + Id + '\'' +
            'group by\n' +
            't1.name,\n' +
            't2.amount,\n' +
            't2.instructions,\n' +
            't2.id,\n' +
            't5.folio,\n' +
            't6.name,\n' +
            't5.delivery_address\n' +
            'order by t5.folio';
        const response = yield database_1.pool.query(sql);
        return res.json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const { user, delivery, address, products } = req.body;
        /*this is how the function call looks like
        select Make_Order(2,Array[
            row(1,'Instruccion 1',1,'{1,3,5}'),
                row(2,'Instruccion 1',2,'{1,2}')]::order_product[])*/
        let arraySize = products.length - 1;
        let product = '';
        if (arraySize == 0) {
            product = `row( ${products[0].amount},'${products[0].instructions}',${products[0].id_product},'{ ${products[0].toppings} }')`;
        }
        else {
            for (let i = 0; i < arraySize; i++) {
                product = product + `row( ${products[i].amount},'${products[i].instructions}',${products[i].id_product},'{ ${products[i].toppings} }'),`;
            }
            product = product + `row( ${products[arraySize].amount},'${products[arraySize].instructions}',${products[arraySize].id_product},'{ ${products[arraySize].toppings} }')`;
        }
        let debug = `SELECT make_order(${user}, '${delivery}'::timestamp, '${address}'::text, Array[ ${product} ] ::order_product[])`;
        console.log('Este es el query' + debug);
        const response = yield database_1.pool.query(debug);
        return res.status(201).json({
            "message": 'ORDER CREATED',
            "data": debug
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
});
exports.updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
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
