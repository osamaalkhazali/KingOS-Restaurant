import express, { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import database  from '../database'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateToken , validateManger} from '../middlewares/authMiddleware';


interface CustomRequest extends Request {
  user?: {}; 
}

class authController implements Controller {

  public path = '/auth';
  public router = express();
  constructor() {
    this.initializeRoutes();
    
  }
  
  private initializeRoutes() {
    this.router.get(`${this.path}`, validateToken , this.valid);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/addWorker`,[validateToken , validateManger] , this.addWorker);
    this.router.get(`${this.path}/workers` , [validateToken , validateManger] , this.getWorkers);
    this.router.get(`${this.path}/allWorkers` , [validateToken , validateManger] , this.AllWorkers);
    this.router.delete(`${this.path}/workers/:id` , [validateToken , validateManger] , this.deleteWorker);
    this.router.get(`${this.path}/workers/:id` , [validateToken , validateManger] , this.getWorker);
    this.router.put(`${this.path}/workers/:id` , [validateToken , validateManger] , this.editWorker);
    
  }
  
  private valid = async (req: CustomRequest, res: Response ) : Promise<Response | void> => {
    try {
      res.status(201).json({ user: req.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private addWorker = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const { name, username, email , password , confirmPassword  } = req.body
      const validUserQuery = 'SELECT username , email FROM restaurantdatabase.workers where username = ? OR email = ?;'
      const [validUser] : any = await database.execute(validUserQuery , [username, email]);
      
      if (validUser.length > 0 ) {
        res.status(400).json({ error: "Username or Email is not available" });
      } else if (password !== confirmPassword) {
        res.status(400).json({ error: "Password does not match" });
      } else {
        let hashedPassword = await bcrypt.hash(password ,8);
        await database.execute(
          'INSERT INTO restaurantdatabase.workers (name ,username, email, password) VALUES (?, ?, ?, ?)',
          [name, username,email,hashedPassword])
          res.status(201).json({ message: "Registration complete" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private login = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const { username , password  } = req.body
      const validUserQuery = 'SELECT * FROM restaurantdatabase.workers where username = ? AND is_deleted = 0;'
      const [validUser] : any = await database.execute(validUserQuery , [username]);

      
      if (validUser.length > 0)  {
        let checker = await bcrypt.compare(password , validUser[0].Password)

        if (checker) {
        const accessToken = jwt.sign(
                                    {username : validUser[0].Username , id : validUser[0].id ,
                                      position : validUser[0].Position , fired :  validUser[0].is_deleted   },
                                    "secretKey" , { expiresIn: "7 days" })
        const validToken = jwt.verify(accessToken, "secretKey");
        
        res.status(200).json( {accessToken , validToken } )
        
        } else {
          res.status(400).json({ error: "Invalid username or password" })
        }
        
      } else {
        res.status(400).json({ error: "Invalid username or password" })
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private getWorkers = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      
      let { searchField = '', searchKey = 'name', filter = '', filterName = 'Position', currentPage = '1', itemsPerPage = '5' , status = 'all' } = req.query ;
      const offset: number = (Number(currentPage) - 1) * Number(itemsPerPage);
      const limit: number = Number(itemsPerPage);
      
      let statusQuery 
      if (status === 'all') {
        statusQuery = ``
      } else if (status === 'active' ) {
        statusQuery = `where workers.is_deleted = 0`
      } else if  (status === 'inactive' ) {
        statusQuery = `where workers.is_deleted = 1`
      }
      
      const workersQuery = `SELECT *
                            FROM ( SELECT workers.id , workers.Name , workers.Username , workers.Email , workers.Position , workers.Created_At as created , workers.Updated_At as updated 
                            , workers.is_deleted as status FROM restaurantdatabase.workers
                          ${statusQuery}
                          )
                            as workersQuery `
      const searchQuery = `${workersQuery}         
                            WHERE ${searchKey} LIKE ?
                            AND ${filterName} LIKE ?`                       
                            
      const countQuery = `
                          SELECT COUNT(*) AS totalItems
                          FROM (${searchQuery}) AS countQuery;
                        `;                      
      const paginationQuery = `
                              ${searchQuery}
                              LIMIT ${limit} OFFSET ${offset};
                              `;
                              
      const filterQuery =`select distinct Position from  restaurantdatabase.workers`
      
      // Pagination
      const [countResults ] : any = await database.query(countQuery, [`%${searchField}%`, `%${filter}%`]);
      const totalCount: number = countResults[0].totalItems;
      const totalPages: number = Math.ceil(totalCount / Number(itemsPerPage));
      // Filter
      let [filterKeys] : any = await database.query(`${filterQuery}`); 
          filterKeys = filterKeys.map((key : any) => key.Position)
      // Results
      const [workers] : any = await database.execute(searchQuery , [`%${searchField}%`, `%${filter}%`]);
      
      res.status(200).json( { data: workers, totalPages , filterKeys} )
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private AllWorkers = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      
      const { username, email } = req.query;

      
      const mainQuery = `SELECT * FROM restaurantdatabase.workers `
      
      if ( Object.keys(req.query).length > 0) {
        const searchQuery = `${mainQuery} where username = ? OR email = ?`
        const [users] = await database.query(searchQuery , [username, email]);
        return res.json(users);
      } else {
        const [users] = await database.query(mainQuery);
        return res.json(users);
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  
  private deleteWorker = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const worker_id = req.params.id;
      const result = await database.execute('UPDATE restaurantdatabase.workers SET workers.is_deleted = ? WHERE id = ?', [1, worker_id]);
      res.json({ message: 'worker fired successfully' });
    } catch (error) {
      console.error('Error :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private getWorker = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const worker_id = req.params.id;
      const result = await database.execute(`SELECT id , Name , Username , Email , Position FROM restaurantdatabase.workers
                                            WHERE id = ? and is_deleted = 0`, [ worker_id]);
      res.json(result[0]);
    } catch (error) {
      console.error('Error :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private editWorker = async (req: Request, res: Response ) : Promise<Response | void> => {
    const post_id = req.params.id;

    const {id , Name, Username, Email , Position  } = req.body;

    try {
      await database.execute(
        'UPDATE restaurantdatabase.workers SET name = ?, username = ?, email = ? , position = ? WHERE id = ?',
        [Name, Username, Email , Position  , post_id]
      );

      res.json({ message: 'Worker updated successfully' });
    } catch (error) {
      console.error('Error updating Worker:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    } 
    
    
}


export { authController };