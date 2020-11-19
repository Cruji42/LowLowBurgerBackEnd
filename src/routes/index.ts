import {Router} from 'express';
import {deleteUser, getUserbyEmail, getUsers, updateUser} from '../controllers/users_controller';
import {createProduct, deleteProduct, getProductbyId, getProducts, updateProduct} from '../controllers/products_controller';
import {createOrder, deleteOrder, getOrderbyId, getOrders, updateOrder} from '../controllers/order_controller';
import {Login, PasswordRecovery, Register, ResetPassword, TOKENGENERATE} from "../controllers/auth_controller";
import {createToppings, deleteToppings, getToppings, getToppingsbyId, updateToppings } from "../controllers/toppings_controller";

const router = Router();



router.get('/', (req, res)=> {
    res.send('API Running');
});


// Auth Routes
router.post('/login', Login);
router.post('/register', Register);
router.post('/recovery', PasswordRecovery);
router.post('/resetpass/:token', ResetPassword);
router.post('/token', TOKENGENERATE);

//User Routes
router.get('/users', getUsers);
router.get('/users/:email', getUserbyEmail);
router.put('/users', updateUser);
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

// Toppings Routes
router.get('/toppings', getToppings);
router.get('/toppings/:id', getToppingsbyId);//detalles de la orden con sus productos
router.post('/toppings', createToppings);
router.put('/toppings/:id', updateToppings);
router.delete('/toppings/:id', deleteToppings);

export default router;

