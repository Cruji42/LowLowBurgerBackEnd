import {Request, Response} from 'express'
import {pool} from '../enviroment/database'
import {QueryResult} from 'pg'



export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try {
        const response: QueryResult = await pool.query('SELECT * FROM products');
        console.log(response.rows);
        return res.status(200).json(
            {
                "result":
                    response.rows
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

export const getProductbyId = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const response = await pool.query('SELECT * FROM products WHERE id= $1', [Id]);
        return res.json(response.rows);
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const {name, description, price, image} = req.body;
        const response = await pool.query('INSERT INTO products (name, description, price, image)' +
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
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const {name, description, price, image} = req.body;
        const response = await pool.query('UPDATE products SET name= $1, description= $2, price= $3, image = $4 ' +
            'WHERE id = $5', [name, description, price, image, Id]);
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
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const response = await pool.query('DELETE FROM products WHERE id= $1', [Id]);
        return res.json('Product ${Id} deleted');
    }catch(error){
        console.log(error);
        return res.status(500).json('internal server error');
    }
}
