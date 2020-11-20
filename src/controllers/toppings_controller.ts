import {Request, Response} from 'express'
import {pool} from '../enviroment/database'
import {QueryResult} from 'pg'



export const getToppings = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const response: QueryResult = await pool.query('SELECT * FROM toppings');
        console.log(response.rows);
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

export const getToppingsbyId = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const response = await pool.query('SELECT * FROM toppings WHERE id= $1', [Id]);
        return res.json(response.rows);
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

export const createToppings = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const {name, price} = req.body;
        const response = await pool.query('INSERT INTO toppings (name, price)' +
            ' VALUES ($1 , $2)', [name, price])
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
}

export const updateToppings = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const {name, description, price, image} = req.body;
        const response = await pool.query('UPDATE toppings SET name= $1, price= $2,' +
            'WHERE id = $3', [name, price, Id]);
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
export const deleteToppings = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const response = await pool.query('DELETE FROM toppings WHERE id= $1', [Id]);
        return res.json('Product ${Id} deleted');
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}
