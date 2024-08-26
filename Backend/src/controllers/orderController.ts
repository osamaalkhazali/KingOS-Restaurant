import express, { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import database  from '../database'; 
import mysql, { ResultSetHeader } from 'mysql2/promise';
import {validateManger , validateToken} from '../middlewares/authMiddleware'
import {io} from '../index';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';


const generateQRCodeDataURL = async (text: string): Promise<string | null> => {
  try {
      const url = await QRCode.toDataURL(text);
      return url;
  } catch (err) {
      console.error('Error generating QR code data URL:', err);
      return null;
  }
};



class orderController implements Controller {

  public path = '/order';
  public router = express();
  private ordersQuery = `SELECT 
                        id , table_id , customer_name , notes , Total_Amount , 
                        Confirmed_Order , Order_Date , Updated_At   
                        FROM restaurantdatabase.orders
                      AS orders `
                      
  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.post(`${this.path}` , this.addOrder);
    this.router.get(`${this.path}`, validateToken , this.ordersDetails);
    
    
  }


  private addOrder = async (req: Request, res: Response ) : Promise<Response | void> => { 
    try {
      let {cart , notes , totalPrice , customerName , tableNumber} = req.body
      // add to orders table 
      const addOrder = `INSERT INTO restaurantdatabase.orders 
                        (customer_name, notes, Total_Amount , Table_id , Confirmed_order ) 
                        VALUES (?, ?, ?, ? , ? )`
      const [order] = await database.execute<ResultSetHeader>(addOrder, [customerName, notes, totalPrice, tableNumber , 1]);
      // add to order items table 
      const orderID : number = order.insertId
      const addOrderItemsQuery = `INSERT INTO restaurantdatabase.order_items 
                                    (order_id, item_id, quantity, price) 
                                    VALUES ${cart.map(() => '(?, ?, ?, ?)').join(', ')}`
      const orderItemsValues = cart.flatMap((item: any) => [orderID, item.id, item.quantity, (item.price * item.quantity)]);
      await database.execute(addOrderItemsQuery, orderItemsValues);
      
      // edit table link
      const uui = uuidv4()
      const orderTableLink = `http://localhost:3000/Order/table/${tableNumber}/${uui}`
      const tableQrCode = await generateQRCodeDataURL(orderTableLink);
      await database.execute(
        `Update restaurantdatabase.tables 
        SET  QRcode = ? , Link = ?  Where id = ?`,
        [ tableQrCode ,uui , tableNumber]
      );

      res.json({ message: 'order created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


private ordersDetails = async (req: Request, res: Response ) : Promise<Response | void> => { 
  try {
    let { searchField = '', searchKey = 'created_at', filter = '', filterName = 'table_id', currentPage = '1', itemsPerPage = '5' } = req.query ;
    const offset: number = (Number(currentPage) - 1) * Number(itemsPerPage);
    const limit: number = Number(itemsPerPage);
    const searchQuery = `${this.ordersQuery}         
                          WHERE ${searchKey} LIKE ?
                          AND ${filterName} LIKE ?` 
    const countQuery = `
                        SELECT COUNT(*) AS totalItems
                        FROM (${searchQuery}) AS countQuery;`
    const paginationQuery = `
                            ${searchQuery}
                            ORDER BY orders.id DESC
                            LIMIT ${limit} OFFSET ${offset}  ;`
    const filterQuery =`select distinct table_id from restaurantdatabase.orders`
    // Pagination
    const [countResults ] : any = await database.query(countQuery, [`%${searchField}%`, `%${filter}%`]);
    const totalCount: number = countResults[0].totalItems;
    const totalPages: number = Math.ceil(totalCount / Number(itemsPerPage));
    // Filter
    let [filterKeys] : any = await database.query(`${filterQuery}`); 
        filterKeys = filterKeys.map((key : any) => key.table_id)
    // Results
    const [result] = await database.query<any[]>(paginationQuery, [`%${searchField}%`, `%${filter}%`]);
    const ordersItemsQuery = `
                              SELECT 
                                  order_items.order_id,
                                  menu_items.name, 
                                  order_items.quantity, 
                                  order_items.price 
                              FROM 
                                  order_items 
                              LEFT JOIN 
                                  menu_items 
                              ON 
                                  menu_items.id = order_items.item_id 
                              WHERE 
                                  order_items.order_id IN (${result.map(result => '?').join(', ')});
                              `
    const [ordersItems] = await database.query<any[]>(ordersItemsQuery , result.map(result => result.id) )
    res.json({ data: result, totalPages , filterKeys , ordersItems });
    
    
    io.on('connection', (socket) => {
      const id = socket.id
      console.log('New Customer : ' + id)
      socket.on('newOrder', (data, callback) => {
        console.log('Received newOrder:', data);
        io.emit('reloadOrders', 'newOrder');
        if (callback) {
          callback('reloadOrders event sent');
        }
      });
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }
  
  
}

export { orderController };