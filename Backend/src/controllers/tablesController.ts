import express, { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import database  from '../database'; 
import {validateManger} from '../middlewares/authMiddleware'





class tablesController implements Controller {

  public path = '/tables';
  public router = express();
  private tablesQuery = `SELECT *
                      FROM (
                        SELECT
                        tables.id,
                        tables.Capacity,
                        tables.created_at as created,
                        tables.updated_at as updated,
                        tables.is_deleted
                        FROM
                          restaurantdatabase.tables
                        WHERE
                          tables.is_deleted = 0
                        ORDER BY
                          tables.id
                      ) AS tables`
                      
  constructor() {
    this.initializeRoutes();
    
  }
  
  private initializeRoutes() {
    this.router.get(`${this.path}` , this.tablesDetails);
    // this.router.post(`${this.path}`, validateManger , this.addItem);
    // this.router.get(`${this.path}/types`, this.types);

  }
  
  private tablesDetails = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      
      const query = 'SELECT * FROM restaurantdatabase.tables'
      
      let { searchField = '', searchKey = 'name', filter = '', filterName = 'foodType', currentPage = '1', itemsPerPage = '5' } = req.query ;
      
      const offset: number = (Number(currentPage) - 1) * Number(itemsPerPage);
      const limit: number = Number(itemsPerPage);
      
      // const searchQuery = `${this.menuQuery}         
      //                     WHERE ${searchKey} LIKE ?
      //                     AND ${filterName} LIKE ?`  
      
      const countQuery = `
      SELECT COUNT(*) AS totalItems
        FROM (${query}) AS countQuery;
        `
        const paginationQuery = `
        ${query}
        LIMIT ${limit} OFFSET ${offset};
        `;
        // const filterQuery =`select distinct Food_Type from  restaurantdatabase.menu_items`
        
        // // Pagination
      const [countResults ] : any = await database.query(countQuery, [`%${searchField}%`, `%${filter}%`]);
      const totalCount: number = countResults[0].totalItems;
      const totalPages: number = Math.ceil(totalCount / Number(itemsPerPage));
      
      // // Filter
      // let [filterKeys] : any = await database.query(`${filterQuery}`); 
      //     filterKeys = filterKeys.map((key : any) => key.Food_Type)
      // // Results
      
      const [tables] = await database.query(paginationQuery);
      
      

      res.json({ data: tables, totalPages }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
  private addItem = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {

      const { name, description, price, foodType } = req.body
      await database.execute(
        `INSERT INTO restaurantdatabase.menu_items 
        (Name, Description, Price , Food_Type ) 
        VALUES (?, ?, ?, ? )`,
        [name, description, price, foodType]
      );
      res.json({ message: 'Item created successfully' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private types = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const [types] = await database.execute('select distinct Food_Type from  restaurantdatabase.menu_items;');
      return res.json(types);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
  

  
}

export {tablesController };




  // private bookEdit = async (req: Request, res: Response ) : Promise<Response | void> => {
  //   try {
  //     const post_id = req.params.id;
  //     const [genres] = await database.execute('SELECT genre_name FROM genres;');
  //     return res.json(genres);
      
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // } 
  
  
    
  // private bookDetails = async (req: Request, res: Response ) : Promise<Response | void> => {
  //   try {
  //         const post_id = req.params.id;
  //       const singleBookQuery = `${this.menuQuery} WHERE id = ? `;
  //       const [result] = await database.execute(singleBookQuery, [post_id]);
  //       res.json(result);
  //   } catch (error) {
  //       console.error('Error fetching blog details:', error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
  // private bookDelete = async (req: Request, res: Response ) : Promise<Response | void> => {
  //   try {
  //     const post_id = req.params.id;
  //     const result = await database.execute('UPDATE books SET is_deleted = ? WHERE id = ?', [1, post_id]);
  //     res.json({ message: 'Book deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting blog:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }