import express from 'express';
const app = express();

import indexRoutes from './routes/index';

//midelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexRoutes);

//using callback
app.listen(5000, ()=> {
    console.log('API Running');
})
