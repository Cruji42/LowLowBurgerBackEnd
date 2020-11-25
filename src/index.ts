import express from 'express';
const app = express();
var cors = require('cors');
import indexRoutes from './routes/index';

//midelwares
app.use(express.json());
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({extended: true}));
app.use(indexRoutes);




app.use(cors())


//using callback
app.listen(process.env.PORT || 5000, ()=> {
    console.log('API Running');
})



