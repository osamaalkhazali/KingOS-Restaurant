import express, { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import database  from '../database'; 
import {validateManger} from '../middlewares/authMiddleware'





class menuController implements Controller {

  public path = '/menu';
  public router = express();
  private menuQuery = `SELECT *
                      FROM (
                        SELECT
                        menu_items.id,
                        menu_items.Name as name,
                        menu_items.Description as description,
                        menu_items.price,
                        menu_items.Food_Type as foodType  ,
                        menu_items.created_at as created,
                        menu_items.updated_at as updated,
                        menu_items.is_deleted
                        FROM
                          restaurantdatabase.menu_items
                        WHERE
                          menu_items.is_deleted = 0
                        ORDER BY
                          menu_items.id
                      ) AS menu_items`
                      
  constructor() {
    this.initializeRoutes();
    
  }
  
  private initializeRoutes() {
    this.router.get(`${this.path}` , this.menuDetails);
    this.router.post(`${this.path}`, validateManger , this.addItem);
    this.router.get(`${this.path}/types`, this.types);
    // this.router.get(`${this.path}/:id`, this.bookDetails);
    // this.router.delete(`${this.path}/:id`, this.bookDelete);
    // this.router.put(`${this.path}/:id`, this.bookEdit);
  }
  
  private menuDetails = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      
      let { searchField = '', searchKey = 'name', filter = '', filterName = 'foodType', currentPage = '1', itemsPerPage = '5' } = req.query ;
      
      const offset: number = (Number(currentPage) - 1) * Number(itemsPerPage);
      const limit: number = Number(itemsPerPage);
      const searchQuery = `${this.menuQuery}         
                          WHERE ${searchKey} LIKE ?
                          AND ${filterName} LIKE ?`  
      const countQuery = `
        SELECT COUNT(*) AS totalItems
        FROM (${searchQuery}) AS countQuery;
      `
      const paginationQuery = `
        ${searchQuery}
        LIMIT ${limit} OFFSET ${offset};
      `;
      const filterQuery =`select distinct Food_Type from  restaurantdatabase.menu_items`
      
      // Pagination
      const [countResults ] : any = await database.query(countQuery, [`%${searchField}%`, `%${filter}%`]);
      const totalCount: number = countResults[0].totalItems;
      const totalPages: number = Math.ceil(totalCount / Number(itemsPerPage));
      // Filter
      let [filterKeys] : any = await database.query(`${filterQuery}`); 
          filterKeys = filterKeys.map((key : any) => key.Food_Type)
      // Results
      const [result] = await database.query(paginationQuery, [`%${searchField}%`, `%${filter}%`]);
      
      
      res.json({ data: result, totalPages , filterKeys}); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
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
  
  
}

export { menuController };