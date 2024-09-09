import express, { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import database  from '../database'; 
import { validateToken , validateManger} from '../middlewares/authMiddleware';




class chartsController implements Controller {

  public path = '/charts';
  public router = express();
                      
  constructor() { 
    this.initializeRoutes();
    
  }
  
  private initializeRoutes() {
    this.router.get(`${this.path}/mostOrdered` , validateToken , this.mostOrdered);
    this.router.get(`${this.path}/todayProfits` , validateToken , this.todayProfits);
    this.router.get(`${this.path}/monthProfits` , validateToken , this.monthProfits);
    this.router.get(`${this.path}/todayOrders` , validateToken , this.todayOrders);
  }
  
  private mostOrdered = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const {Food_Type} = req.query
      
      const mostOrderedQuery = `SELECT COUNT(order_items.item_id) AS orders, 
                                      order_items.item_id, 
                                      menu_items.Name
                                FROM restaurantdatabase.order_items  
                                INNER JOIN restaurantdatabase.menu_items 
                                    ON order_items.item_id = menu_items.id 
                                    AND menu_items.Food_Type like '%${Food_Type}%'
                                GROUP BY order_items.item_id, menu_items.Name
                                ORDER BY orders DESC Limit 10;`
      // Results
      const [result] = await database.query(mostOrderedQuery);
      res.json({ data: result}); 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  
  private todayProfits = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {

      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); 
      const dd = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      const [result] = await database.execute(
        `SELECT SUM(Total_Amount) as todayProfits
          FROM restaurantdatabase.orders 
          WHERE Order_Date like '${formattedDate}%';`
      );
      
      res.json({ result });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private monthProfits = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
        
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        
        
        const [result] = await database.execute(
        `SELECT SUM(Total_Amount) as monthProfits
          FROM restaurantdatabase.orders 
          WHERE YEAR(Order_Date) = ${yyyy} 
          AND MONTH(Order_Date) = ${mm};`
      );
      
      res.json({ result });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private todayOrders = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
        
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        const [result] = await database.execute(
        `SELECT COUNT(*) as todayOrders
          FROM restaurantdatabase.orders 
          WHERE Order_Date like '${formattedDate}%';`
      );
      res.json( {result} );
      
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  
}

export { chartsController };