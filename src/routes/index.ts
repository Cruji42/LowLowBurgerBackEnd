import {Router} from 'express';
import {deleteUser, getUserbyEmail, getUsers, updateUser} from '../controllers/users_controller';
import {createProduct, deleteProduct, getProductbyId, getProducts, updateProduct} from '../controllers/products_controller';
import {createOrder, deleteOrder, getOrderbyId, getOrders, updateOrder} from '../controllers/order_controller';
import {Login, PasswordRecovery, Register} from "../controllers/auth_controller";
const router = Router();



router.get('/', (req, res)=> {
    res.send('API Running');
});


// Auth Routes
router.post('/login', Login);
router.post('/register', Register);
router.post('/recovery', PasswordRecovery);

//User Routes
router.get('/users', getUsers);
router.get('/users/:email', getUserbyEmail);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Products Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductbyId);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders Routes
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderbyId);//detalles de la orden con sus productos
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;

