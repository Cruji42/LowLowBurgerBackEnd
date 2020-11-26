import {Request, Response} from 'express'
import {pool} from '../enviroment/database'
import {QueryResult} from 'pg'



export const getData = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const {day_min, day_max} = req.body;
        let result = {"pie-chart": {}, "orders":{}};
        const response: QueryResult = await pool.query('select ROUND( (count(products_id)::float*100/(select count(id)::float from order_item))::numeric, 2 ) porcentaje, t2.name from order_item t1\n' +
            '            join products t2 on  \n' +
            '            t1.products_id = t2.id\n' +
            '            group by t1.products_id, t2.name\n' +
            '\t\t\t');
        result["pie-chart"] = response.rows;
        const response2: QueryResult = await pool.query(`select * from public.order t1 where delivery_date between '${day_min}' and '${day_max}'`);
        result["orders"] = response2.rows;

        return res.status(200).json({"graph_data": [result]});
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
}
