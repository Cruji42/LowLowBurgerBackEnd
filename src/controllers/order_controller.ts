import {json, Request, Response} from 'express'
import {pool} from '../enviroment/database'
import {QueryResult} from 'pg'

export const getOrders = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        //va a traer los json
        let data = {
                "folio":"",
                "user":"",
                "delivery":"",
                "address":"",
                "products":[]
        };
        let product = {
            "amount": "",
            "instructions": "",
            "product": "",
            "toppings": []
        };
        const getFolios : QueryResult = await pool.query('select distinct folio from public.order');
        let _folios = getFolios.rows;
        let folios = [];
        let counter = 0;
        let counter2 = -1;
        let orders = [];
        for await (let folio of _folios){
            folios[counter] = folio['folio']
            counter = counter + 1;
        }
        // console.log(folios);
        for await (let i of folios){
            let sql=`Select distinct t5.folio orden, t6.name cliente, t5.delivery_address direccion, t5.delivery_date fecha,
(select array[t2.amount::text, t1.name, t2.instructions, replace(replace(array_agg(t4.name)::text,'{',''),'}','') ]) as producto
from products as t1
join order_item as t2 on t1.id = t2.products_id
join order_item_has_toppings t3 on t3.order_item_order_id = t2.id
join toppings as t4 on t4.id = t3.toppings_id
join public.order as t5 on t5.id = t2.order_id
join users as t6 on t6.id = t5.user_id
where t5.folio = '${i}'
group by
t1.name,
t2.amount,
t2.instructions,
t2.id,
t5.folio,
t6.name,
t5.delivery_address,
t5.delivery_date
order by t5.folio`;
            let resp: QueryResult = await pool.query(sql);
            data['folio'] = resp.rows[counter2]['orden'];
            data['user'] = resp.rows[counter2]['cliente'];
            data['delivery'] = resp.rows[counter2]['fecha'];
            data['address'] = resp.rows[counter2]['direccion'];
            for (let i = 0; i<resp.rowCount; i++){
                product['amount'] = resp.rows[i]['producto'][0];
                product['product'] = resp.rows[i]['producto'][1];
                product['instructions'] = resp.rows[i]['producto'][2];
                product['toppings'] = resp.rows[i]['producto'][3];
                // @ts-ignore
                data['products'][i] =  product;
                product = {
                    "amount": "",
                    "instructions": "",
                    "product": "",
                    "toppings": []
                }
            }
            orders[counter2] = data;
            counter2 = counter2++;
            console.log(data + counter2.toString());
            orders.push(data);
        }
        /*for(let i= 0; i>getFolios.rowCount; i++){
            let folio = folios[i];
            const response: QueryResult = await pool.query(sql);
            data['orders']['folio'] = response.rows[0]['orden'];
            data['orders']['user'] = response.rows[0]['cliente'];
            data['orders']['delivery'] = response.rows[0]['fecha'];
            data['orders']['address'] = response.rows[0]['dirección'];
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
        return res.status(200).json({orders});

    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
}
export const getOrderbyId = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const Id = req.params.id;

        let data = {
                "folio":"",
                "user":"",
                "state":"",
                "total":"",
                "delivery":"",
                "address":"",
                "products":[]
        };

        let product = {
            "amount": "",
            "instructions": "",
            "image":"",
            "product": "",
            "toppings": []
        }
        let sql=`Select distinct t5.folio orden, t5.state, t5.total, t6.name cliente, t5.delivery_address direccion, t5.delivery_date fecha,
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

        const response: QueryResult = await pool.query(sql);

        data['folio'] = response.rows[0]['orden'];
        data['user'] = response.rows[0]['cliente'];
        data['state'] = response.rows[0]['state'];
        data['total'] = response.rows[0]['total'];
        data['delivery'] = response.rows[0]['fecha'];
        data['address'] = response.rows[0]['direccion'];

        for (let i = 0; i<response.rowCount; i++){
                    product['amount'] = response.rows[i]['producto'][0];
                    product['product'] = response.rows[i]['producto'][1];
                    product['image'] = response.rows[i]['producto'][2];
                    product['instructions'] = response.rows[i]['producto'][3];
                    product['toppings'] = response.rows[i]['producto'][4];
                    // @ts-ignore
                    data['products'][i] =  product;
                    product = {
                        "amount": "",
                        "instructions": "",
                        "image":"",
                        "product": "",
                        "toppings": []
                    }
        }

        return res.status(200).json({"order":[data]});
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
}
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Allow', '*');
    try{
        const {user, delivery, address, products} = req.body;
        /*this is how the function call looks like
        select Make_Order(2,Array[
            row(1,'Instruccion 1',1,'{1,3,5}'),
                row(2,'Instruccion 1',2,'{1,2}')]::order_product[])*/
        let arraySize = products.length-1;
        let product = '';
        if(arraySize == 0){
            product = `row( ${products[0].amount},'${products[0].instructions}',${products[0].id_product},'{ ${products[0].toppings} }')`;
        }else {
         for(let i=0; i < arraySize; i++){
                product = product + `row( ${products[i].amount},'${products[i].instructions}',${products[i].id_product},'{ ${products[i].toppings} }'),`;
            }
            product = product + `row( ${products[arraySize].amount},'${products[arraySize].instructions}',${products[arraySize].id_product},'{ ${products[arraySize].toppings} }')`;
        }
        let debug = `SELECT make_order(${user}, '${delivery}'::timestamp, '${address}'::text, Array[ ${product} ] ::order_product[])`
        console.log('Este es el query' + debug);
        const response = await pool.query(debug);
        return res.status(201).json({
            "message": 'ORDER CREATED',
            "data": debug
        })
    }catch(error){
        console.log(error);
        return res.status(500).json('Internal server error');
    }
}
export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const {name, description, price, image, id} = req.body;
        const response = await pool.query('UPDATE products SET name= $1, description= $2, price= $3, image = $4 ' +
            'WHERE id = $5', [name, description, price, image, id]);
        return res.json({
            message: 'Product updated',
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
}
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const response = await pool.query('DELETE FROM order WHERE id= $1', [Id]);
        return res.json('Product ${Id} deleted');
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}
