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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderbyId = exports.getUserOrders = exports.getOrders = void 0;
const database_1 = require("../enviroment/database");
// export const getOrders = async (req: Request, res: Response): Promise<Response> => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     try {
//         //va a traer los json
//         let data = {
//                 "folio":"",
//                 "user":"",
//                 "state":"",
//                 "total":"",
//                 "delivery":"",
//                 "address":"",
//                 "products":[]
//         };
//         let product = {
//             "amount": "",
//             "instructions": "",
//             "image": "",
//             "product": "",
//             "toppings": []
//         };
//         const getFolios : QueryResult = await pool.query('select distinct folio from public.order');
//         let _folios = getFolios.rows;
//         let folios = [];
//         let counter = 0;
//         let counter2 = -1;
//         let orders = [];
//         for await (let folio of _folios){
//             folios[counter] = folio['folio']
//             counter = counter + 1;
//         }
//         // console.log(folios);
//         for await (let i of folios){
//             let sql=`Select distinct t5.folio orden, t5.state, t5.total, t6.name cliente, t5.delivery_address direccion, t5.delivery_date fecha,
// (select array[t2.amount::text, t1.name, t2.instructions, t1.image, replace(replace(array_agg(t4.name)::text,'{',''),'}','') ]) as producto
// from products as t1
// join order_item as t2 on t1.id = t2.products_id
// join order_item_has_toppings t3 on t3.order_item_order_id = t2.id
// join toppings as t4 on t4.id = t3.toppings_id
// join public.order as t5 on t5.id = t2.order_id
// join users as t6 on t6.id = t5.user_id
// group by
// t1.name,
// t2.amount,
// t2.instructions,
// t2.id,
// t5.folio,
// t6.name,
// t5.delivery_address,
// t5.delivery_date,
// t5.state,
// t5.total,
// t1.image
// order by t5.folio`;
//             let resp: QueryResult = await pool.query(sql);
//             data['folio'] = resp.rows[counter2]['orden'];
//             console.log(resp.rows[0]);
//
//             data['user'] = resp.rows[counter2]['cliente'];
//             data['state'] = resp.rows[counter]['state'];
//             data['total'] = resp.rows[counter]['total'];
//             data['delivery'] = resp.rows[counter2]['fecha'];
//             data['address'] = resp.rows[counter2]['direccion'];
//             for (let i = 0; i<resp.rowCount; i++){
//                 product['amount'] = resp.rows[i]['producto'][0];
//                 product['instructions'] = resp.rows[i]['producto'][1];
//                 product['image'] = resp.rows[i]['producto'][2];
//                 product['product'] = resp.rows[i]['producto'][3];
//                 product['toppings'] = resp.rows[i]['producto'][4];
//                 // @ts-ignore
//                 data['products'][i] =  product;
//                 product = {
//                     "amount": "",
//                     "instructions": "",
//                     "image": "",
//                     "product": "",
//                     "toppings": []
//                 };
//             }
//             orders[counter2] = data;
//             counter2 = counter2++;
//             console.log(data + counter2.toString());
//             orders.push(data);
//         }
//         for(let i= 0; i>getFolios.rowCount; i++){
//             let folio = folios[i];
//             const response: QueryResult = await pool.query(sql);
//             data['orders']['folio'] = response.rows[0]['orden'];
//             data['orders']['user'] = response.rows[0]['cliente'];
//             data['orders']['delivery'] = response.rows[0]['fecha'];
//             data['orders']['address'] = response.rows[0]['direccion'];
//             for (let i = 0; i<response.rowCount; i++){
//                 product['amount'] = response.rows[i]['producto'][0];
//                 product['product'] = response.rows[i]['producto'][1];
//                 product['instructions'] = response.rows[i]['producto'][2];
//                 product['toppings'] = response.rows[i]['producto'][3];
//                 // @ts-ignore
//                 data[`orders`]['products'][i] =  product;
//                 product = {
//                     "amount": "",
//                     "instructions": "",
//                     "product": "",
//                     "toppings": []
//                 }
//             }
//             orders[i] = data;
//         }
//         return res.status(200).json({orders});
//
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json('internal server error');
//     }
//
// //     try {
// //         //va a traer los json
// //         let data = {
// //             "folio":"",
// //             "user":"",
// //             "state":"",
// //             "total":"",
// //             "delivery":"",
// //             "address":"",
// //             "products":[]
// //         };
// //         let product = {
// //             "amount": "",
// //             "instructions": "",
// //             "image": "",
// //             "product": "",
// //             "toppings": []
// //         };
// //         const getFolios : QueryResult = await pool.query('select distinct folio from public.order');
// //         let _folios = getFolios.rows;
// //         let folios = [];
// //         let counter = 0;
// //         let counter2 = -1;
// //         let orders = [];
// //         for await (let folio of _folios){
// //             folios[counter] = folio['folio']
// //             counter = counter + 1;
// //         }
// //
// //         for await (let i of folios) {
// //             const sql = `Select distinct t5.folio orden, t5.state, t5.total, t6.name cliente, t5.delivery_address direccion, t5.delivery_date fecha,
// // (select array[t2.amount::text, t1.name, t2.instructions, t1.image, replace(replace(array_agg(t4.name)::text,'{',''),'}','') ]) as producto
// // from products as t1
// // join order_item as t2 on t1.id = t2.products_id
// // join order_item_has_toppings t3 on t3.order_item_order_id = t2.id
// // join toppings as t4 on t4.id = t3.toppings_id
// // join public.order as t5 on t5.id = t2.order_id
// // join users as t6 on t6.id = t5.user_id
// // where t5.folio = '${i}'
// // group by
// // t1.name,
// // t2.amount,
// // t2.instructions,
// // t2.id,
// // t5.folio,
// // t6.name,
// // t5.delivery_address,
// // t5.delivery_date,
// // t5.state,
// // t5.total,
// // t1.image
// // order by t5.folio`;
// //             const response: QueryResult = await pool.query(sql);
// //             data['folio'] = response.rows[0]['orden'];
// //             data['user'] = response.rows[0]['cliente'];
// //             data['state'] = response.rows[0]['state'];
// //             data['total'] = response.rows[0]['total'];
// //             data['delivery'] = response.rows[0]['fecha'];
// //             data['address'] = response.rows[0]['direccion'];
// //             console.log(data);
// //         }
// //         for (let i = 0; i< getFolios.rowCount; i++){
// //             product['amount'] = getFolios.rows[i]['producto'][0];
// //             product['product'] = getFolios.rows[i]['producto'][1];
// //             product['instructions'] = getFolios.rows[i]['producto'][2];
// //             product['toppings'] = getFolios.rows[i]['producto'][3];
// //             // @ts-ignore
// //             data['products'][i] =  product;
// //             product = {
// //                 "amount": "",
// //                 "instructions": "",
// //                 "image": "",
// //                 "product": "",
// //                 "toppings": []
// //             }
// //         }
// //
// //        /* for (let i = 0; i<response.rowCount; i++){
// //             product['amount'] = response.rows[i]['producto'][0];
// //             product['product'] = response.rows[i]['producto'][1];
// //             product['image'] = response.rows[i]['producto'][2];
// //             product['instructions'] = response.rows[i]['producto'][3];
// //             product['toppings'] = response.rows[i]['producto'][4];
// //             // @ts-ignore
// //             data['products'][i] =  product;
// //             product = {
// //                 "amount": "",
// //                 "instructions": "",
// //                 "image":"",
// //                 "product": "",
// //                 "toppings": []
// //             }
// //         }
// // */
// //         return res.status(200).json({"order":[data]});
// //     }
// //     catch (error) {
// //         console.log(error);
// //         return res.status(500).json('internal server error');
// //     }
// }
exports.getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a, e_2, _b;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        //va a traer los json
        let orders = [];
        let data = [{
                "folio": "",
                "user": "",
                "delivery": "",
                "address": "",
                "products": []
            }];
        let product = {
            "amount": "",
            "instructions": "",
            "product": "",
            "toppings": []
        };
        const getFolios = yield database_1.pool.query('select distinct folio from public.order');
        let _folios = getFolios.rows;
        let folios = [];
        let counter = 0;
        let counter2 = 0;
        try {
            for (var _folios_1 = __asyncValues(_folios), _folios_1_1; _folios_1_1 = yield _folios_1.next(), !_folios_1_1.done;) {
                let folio = _folios_1_1.value;
                folios[counter] = folio['folio'];
                counter = counter + 1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_folios_1_1 && !_folios_1_1.done && (_a = _folios_1.return)) yield _a.call(_folios_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // console.log(folios);
            for (var folios_1 = __asyncValues(folios), folios_1_1; folios_1_1 = yield folios_1.next(), !folios_1_1.done;) {
                let i = folios_1_1.value;
                let sql = `Select distinct t5.folio orden, t6.name cliente, t5.state,t5.total, t5.delivery_address direccion, t5.delivery_date fecha
--(select array[t2.amount::text, t1.name, t2.instructions, replace(replace(array_agg(t4.name)::text,'{',''),'}','') ]) as producto
from products as t1
join order_item as t2 on t1.id = t2.products_id
join order_item_has_toppings t3 on t3.order_item_order_id = t2.id
join toppings as t4 on t4.id = t3.toppings_id
join public.order as t5 on t5.id = t2.order_id
join users as t6 on t6.id = t5.user_id
where t5.state = 'Solicitada'
group by
t1.name,
t2.amount,
t2.instructions,
t2.id,
t5.folio,
t6.name,
t5.delivery_address,
t5.state,
t5.total, 
t5.delivery_date
order by t5.folio`;
                const response = yield database_1.pool.query(sql);
                /*data[counter2]['folio'] = response.rows[counter2]['orden'];
                data[counter2]['user'] = response.rows[counter2]['cliente'];
                data[counter2]['delivery'] = response.rows[counter2]['fecha'];
                data[counter2]['address'] = response.rows[counter2]['direccion'];*/
                orders = response.rows;
                /*            for (let i = 0; i<response.rowCount; i++){
                                product['amount'] = response.rows[i]['producto'][0];
                                product['product'] = response.rows[i]['producto'][1];
                                product['instructions'] = response.rows[i]['producto'][2];
                                product['toppings'] = response.rows[i]['producto'][3];
                                // @ts-ignore
                                data['products'][i] =  product;
                                product = {
                                    "amount": "",
                                    "instructions": "",
                                    "product": "",
                                    "toppings": []
                                }
                                // console.log(data);
                                orders[i]= data;
                            }*/
                counter2 = counter2++;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (folios_1_1 && !folios_1_1.done && (_b = folios_1.return)) yield _b.call(folios_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        /*for(let i= 0; i>getFolios.rowCount; i++){
            let folio = folios[i];
            const response: QueryResult = await pool.query(sql);
            data['orders']['folio'] = response.rows[0]['orden'];
            data['orders']['user'] = response.rows[0]['cliente'];
            data['orders']['delivery'] = response.rows[0]['fecha'];
            data['orders']['address'] = response.rows[0]['direccion'];
            for (let i = 0; i<response.rowCount; i++){
                product['amount'] = response.rows[i]['producto'][0];
                product['product'] = response.rows[i]['producto'][1];
                product['instructions'] = response.rows[i]['producto'][2];
                product['toppings'] = response.rows[i]['producto'][3];
                // @ts-ignore
                data[`orders`]['products'][i] =  product;
                product = {
                    "amount": "",
                    "instructions": "",
                    "product": "",
                    "toppings": []
                }
            }
            orders[i] = data;
        }*/
        return res.status(200).json({ orders });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var e_3, _c, e_4, _d;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const Id = req.params.id;
        //va a traer los json
        let orders = [];
        let data = [{
                "folio": "",
                "user": "",
                "delivery": "",
                "address": "",
                "products": []
            }];
        let product = {
            "amount": "",
            "instructions": "",
            "product": "",
            "toppings": []
        };
        const getFolios = yield database_1.pool.query('select distinct folio from public.order');
        let _folios = getFolios.rows;
        let folios = [];
        let counter = 0;
        let counter2 = 0;
        try {
            for (var _folios_2 = __asyncValues(_folios), _folios_2_1; _folios_2_1 = yield _folios_2.next(), !_folios_2_1.done;) {
                let folio = _folios_2_1.value;
                folios[counter] = folio['folio'];
                counter = counter + 1;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_folios_2_1 && !_folios_2_1.done && (_c = _folios_2.return)) yield _c.call(_folios_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            // console.log(folios);
            for (var folios_2 = __asyncValues(folios), folios_2_1; folios_2_1 = yield folios_2.next(), !folios_2_1.done;) {
                let i = folios_2_1.value;
                let sql = `Select distinct t5.folio orden, t6.name cliente, t5.state,t5.total, t5.delivery_address direccion, t5.delivery_date fecha
--(select array[t2.amount::text, t1.name, t2.instructions, replace(replace(array_agg(t4.name)::text,'{',''),'}','') ]) as producto
from products as t1
join order_item as t2 on t1.id = t2.products_id
join order_item_has_toppings t3 on t3.order_item_order_id = t2.id
join toppings as t4 on t4.id = t3.toppings_id
join public.order as t5 on t5.id = t2.order_id
join users as t6 on t6.id = t5.user_id
where t6.id = ${Id}
group by
t1.name,
t2.amount,
t2.instructions,
t2.id,
t5.folio,
t6.name,
t5.delivery_address,
t5.state,
t5.total, 
t5.delivery_date
order by t5.folio`;
                const response = yield database_1.pool.query(sql);
                /*data[counter2]['folio'] = response.rows[counter2]['orden'];
                data[counter2]['user'] = response.rows[counter2]['cliente'];
                data[counter2]['delivery'] = response.rows[counter2]['fecha'];
                data[counter2]['address'] = response.rows[counter2]['direccion'];*/
                orders = response.rows;
                /*            for (let i = 0; i<response.rowCount; i++){
                                product['amount'] = response.rows[i]['producto'][0];
                                product['product'] = response.rows[i]['producto'][1];
                                product['instructions'] = response.rows[i]['producto'][2];
                                product['toppings'] = response.rows[i]['producto'][3];
                                // @ts-ignore
                                data['products'][i] =  product;
                                product = {
                                    "amount": "",
                                    "instructions": "",
                                    "product": "",
                                    "toppings": []
                                }
                                // console.log(data);
                                orders[i]= data;
                            }*/
                counter2 = counter2++;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (folios_2_1 && !folios_2_1.done && (_d = folios_2.return)) yield _d.call(folios_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        /*for(let i= 0; i>getFolios.rowCount; i++){
            let folio = folios[i];
            const response: QueryResult = await pool.query(sql);
            data['orders']['folio'] = response.rows[0]['orden'];
            data['orders']['user'] = response.rows[0]['cliente'];
            data['orders']['delivery'] = response.rows[0]['fecha'];
            data['orders']['address'] = response.rows[0]['direccion'];
            for (let i = 0; i<response.rowCount; i++){
                product['amount'] = response.rows[i]['producto'][0];
                product['product'] = response.rows[i]['producto'][1];
                product['instructions'] = response.rows[i]['producto'][2];
                product['toppings'] = response.rows[i]['producto'][3];
                // @ts-ignore
                data[`orders`]['products'][i] =  product;
                product = {
                    "amount": "",
                    "instructions": "",
                    "product": "",
                    "toppings": []
                }
            }
            orders[i] = data;
        }*/
        return res.status(200).json({ orders });
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
        let data = {
            "folio": "",
            "user": "",
            "state": "",
            "total": "",
            "delivery": "",
            "address": "",
            "products": []
        };
        let product = {
            "amount": "",
            "instructions": "",
            "image": "",
            "product": "",
            "toppings": []
        };
        let sql = `Select distinct t5.folio orden, t5.state, t5.total, t6.name cliente, t5.delivery_address direccion, t5.delivery_date fecha,
(select array[t2.amount::text, t1.name, t2.instructions, t1.image, replace(replace(array_agg(t4.name)::text,'{',''),'}','') ]) as producto
from products as t1
join order_item as t2 on t1.id = t2.products_id
join order_item_has_toppings t3 on t3.order_item_order_id = t2.id
join toppings as t4 on t4.id = t3.toppings_id
join public.order as t5 on t5.id = t2.order_id
join users as t6 on t6.id = t5.user_id
where t5.folio = '${Id}'
group by
t1.name,
t2.amount,
t2.instructions,
t2.id,
t5.folio,
t6.name,
t5.delivery_address,
t5.delivery_date,
t5.state,
t5.total,
t1.image
order by t5.folio`;
        const response = yield database_1.pool.query(sql);
        data['folio'] = response.rows[0]['orden'];
        data['user'] = response.rows[0]['cliente'];
        data['state'] = response.rows[0]['state'];
        data['total'] = response.rows[0]['total'];
        data['delivery'] = response.rows[0]['fecha'];
        data['address'] = response.rows[0]['direccion'];
        for (let i = 0; i < response.rowCount; i++) {
            product['amount'] = response.rows[i]['producto'][0];
            product['product'] = response.rows[i]['producto'][1];
            product['image'] = response.rows[i]['producto'][2];
            product['instructions'] = response.rows[i]['producto'][3];
            product['toppings'] = response.rows[i]['producto'][4];
            // @ts-ignore
            data['products'][i] = product;
            product = {
                "amount": "",
                "instructions": "",
                "image": "",
                "product": "",
                "toppings": []
            };
        }
        return res.status(200).json({ "order": [data] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Allow', '*');
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
        const { folio } = req.body;
        const status = 'Lista';
        const response = yield database_1.pool.query(`UPDATE public."order" SET state= '${status}' WHERE folio = '${folio}' `);
        return res.json({
            message: 'Order updated'
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
