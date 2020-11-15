"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users_controller");
const products_controller_1 = require("../controllers/products_controller");
const order_controller_1 = require("../controllers/order_controller");
const auth_controller_1 = require("../controllers/auth_controller");
const toppings_controller_1 = require("../controllers/toppings_controller");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('API Running');
});
// Auth Routes
router.post('/login', auth_controller_1.Login);
router.post('/register', auth_controller_1.Register);
router.post('/recovery', auth_controller_1.PasswordRecovery);
//User Routes
router.get('/users', users_controller_1.getUsers);
router.get('/users/:email', users_controller_1.getUserbyEmail);
router.put('/users', users_controller_1.updateUser);
router.delete('/users/:id', users_controller_1.deleteUser);
// Products Routes
router.get('/products', products_controller_1.getProducts);
router.get('/products/:id', products_controller_1.getProductbyId);
router.post('/products', products_controller_1.createProduct);
router.put('/products/:id', products_controller_1.updateProduct);
router.delete('/products/:id', products_controller_1.deleteProduct);
// Orders Routes
router.get('/orders', order_controller_1.getOrders);
router.get('/orders/:id', order_controller_1.getOrderbyId); //detalles de la orden con sus productos
router.post('/orders', order_controller_1.createOrder);
router.put('/orders/:id', order_controller_1.updateOrder);
router.delete('/orders/:id', order_controller_1.deleteOrder);
// Toppings Routes
router.get('/toppings', toppings_controller_1.getToppings);
router.get('/toppings/:id', toppings_controller_1.getToppingsbyId); //detalles de la orden con sus productos
router.post('/toppings', toppings_controller_1.createToppings);
router.put('/toppings/:id', toppings_controller_1.updateToppings);
router.delete('/toppings/:id', toppings_controller_1.deleteToppings);
exports.default = router;
