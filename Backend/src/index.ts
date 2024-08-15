import express from 'express';
import bodyParser = require("body-parser");
import morgan  from 'morgan'; import database from './database'
database.connect
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev')); 
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'] // Allow requests from this origin
}));

import {validateManger, validateToken } from './middlewares/authMiddleware'

import { authController } from './controllers/authController';
import { menuController } from './controllers/menuController';
import { tablesController } from './controllers/tablesController';
const auth = new authController;
const menu = new menuController
const tables = new tablesController


app.use('/', auth.router)
app.use('/', [validateToken])
app.use('/', menu.router)
app.use('/', tables.router)

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


app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});


interface CounterFunction {
  (): number; // Define the function signature
  reset: () => void; // Define the reset method signature
}

function counter(): CounterFunction {
  let c = 0;

  // Define the counter function
  let counter_Function: CounterFunction = <CounterFunction>function() {
      return c++;
  };

  // Add the reset method to the function
  counter_Function.reset = function() {
      c = 0;
  };

  return counter_Function;
}

// Usage example
let c = counter();
console.log(c()); // Outputs: 0
console.log(c()); // Outputs: 1
c.reset();
console.log(c()); // Outputs: 0