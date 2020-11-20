import express from 'express';
const app = express();
var cors = require('cors');
import indexRoutes from './routes/index';

//midelwares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(indexRoutes);




app.use(cors())


//using callback
app.listen(process.env.PORT || 5000, ()=> {
    console.log('API Running');
})



