"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
var cors = require('cors');
const index_1 = __importDefault(require("./routes/index"));
//midelwares
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_1.default);
app.use(cors());
//using callback
app.listen(process.env.PORT || 5000, () => {
    console.log('API Running');
});
