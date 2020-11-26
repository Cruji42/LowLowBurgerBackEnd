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
exports.getData = void 0;
const database_1 = require("../enviroment/database");
exports.getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const { day_min, day_max } = req.body;
        let result = { "pie-chart": {}, "orders": {} };
        const response = yield database_1.pool.query('select count(products_id)*100/(select count(id) from order_item) porcentaje, t2.name from order_item t1\n' +
            'join products t2 on \n' +
            't1.products_id = t2.id\n' +
            'group by t1.products_id, t2.name');
        result["pie-chart"] = response.rows;
        const response2 = yield database_1.pool.query(`select * from public.order t1 where delivery_date between '${day_min}' and '${day_max}'`);
        result["orders"] = response2.rows;
        return res.status(200).json({ "graph_data": [result] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
