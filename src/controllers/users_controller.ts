import {Request, Response} from 'express'
import {pool} from '../enviroment/database'
import {QueryResult} from 'pg'



export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   try {
    const response: QueryResult = await pool.query('SELECT * FROM users');
    console.log(response.rows);
    return res.status(200).json(response.rows);   
   } catch (error) {
       console.log(error);
       return res.status(500).json('internal server error');
   }
}

export const getUserbyEmail = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const response = await pool.query('SELECT * FROM users WHERE email= $1', [req.params.email]);
        return res.json({"user":response.rows});
    }catch(error){
console.log(error);
return res.status(500).json('internal server error');
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
     try{
      const {name, last_name, address, email, password, phone_number} = req.body;
      const response = await pool.query('INSERT INTO users (name, last_name, address, email, password,' +
          ' phone_number) VALUES ($1 , $2, $3, $4, $5, $6)', [name, last_name, address, email, password, phone_number])
      return res.status(500).json({
          message: 'User created',
          body:{
              user:{
                name,
                last_name
              }
          }
      })
     }catch(error){
 console.log(error);
 return res.status(500).json('internal server error');
     }
 }

 export const updateUser = async (req: Request, res: Response): Promise<Response> => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
     // const Id = parseInt(req.params.id);
     const {id, name, last_name, address, email, password, phone_number, rol} = req.body;
     const response = await pool.query('UPDATE users SET name= $1, last_name= $2, address= $3, ' +
         'email = $4, password= $5, phone_number= $6, rol= $7 WHERE id = $8', [name, last_name, address, email,
         password, phone_number, rol, id]);
     return res.json({
         message: 'User updated',
         body:{
             user:{
               name,
               last_name
             }
         }
     })
    }catch(error){
console.log(error);
return res.status(500).json('internal server error');
    }
}
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    try{
        const Id = parseInt(req.params.id);
        const response = await pool.query('DELETE FROM users WHERE id= $1', [Id]);
        return res.json('User ${Id} deleted');
    }catch(error){
console.log(error);
return res.status(500).json('internal server error');
    }
}
