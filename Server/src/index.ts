import express from 'express';
import bodyParser = require("body-parser");
import morgan  from 'morgan'; 
import database from './database'
import cors from 'cors';
import { Server } from "socket.io";



database.connect
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev')); 
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'] // Allow requests from this hosts
}));





import {validateManger, validateToken } from './middlewares/authMiddleware'

import { authController } from './controllers/authController';
import { menuController } from './controllers/menuController';
import { tablesController } from './controllers/tablesController';
import { orderController } from './controllers/orderController';
import { chartsController } from './controllers/chartsController';
const auth = new authController;
const menu = new menuController
const tables = new tablesController
const order = new orderController
const charts = new chartsController


app.use('/', auth.router)
app.use('/', menu.router)
app.use('/', tables.router)
app.use('/', order.router)
app.use('/', charts.router)
app.use('/', [validateToken])


app.get('/', (req, res) => {
  res.send('KingOS Restaurant');
}); 

app.get('/menu', async (req, res) => {
  try {
    const query = 'SELECT * FROM restaurantdatabase.menu_items;'
    const [menu_items] = await database.query(query)
    res.json(menu_items)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}); 


const expressServer = app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});

// socket connection
const io = new Server(expressServer , { 
                                        cors : { origin : '*'}  
                                      });
                                      
export {io}

