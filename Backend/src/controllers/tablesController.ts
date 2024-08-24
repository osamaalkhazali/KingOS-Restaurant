import express, { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import database  from '../database'; 
import mysql, { ResultSetHeader } from 'mysql2/promise';
import {validateManger , validateToken} from '../middlewares/authMiddleware'
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


class tablesController implements Controller {

  public path = '/tables';
  public router = express();
  private tablesQuery = `SELECT *
                      FROM (
                        SELECT
                        tables.id,
                        tables.Capacity,
                        tables.QRcode,
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
    this.router.get(`${this.path}/count` , this.tablesCount);
    this.router.get(`${this.path}`, validateToken, this.tablesDetails);
    this.router.post(`${this.path}`, validateToken , validateManger , this.addTable);
    this.router.put(`${this.path}/:id`, validateToken , validateManger , this.editTable);
  }
  
  private tablesCount = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      
      const query = 'SELECT count(*) as count FROM restaurantdatabase.tables'
      const [tablesCount] = await database.query(query);
      res.json(tablesCount); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 

  
  private tablesDetails = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      
      const query = 'SELECT * FROM restaurantdatabase.tables'
      
      let { searchField = '', searchKey = 'name', filter = '', filterName = 'foodType', currentPage = '1', itemsPerPage = '5' } = req.query ;
      
      const offset: number = (Number(currentPage) - 1) * Number(itemsPerPage);
      const limit: number = Number(itemsPerPage);
      
      const countQuery = `
      SELECT COUNT(*) AS totalItems
        FROM (${query}) AS countQuery;
        `
        const paginationQuery = `
        ${query}
        LIMIT ${limit} OFFSET ${offset};
        `;

        // // Pagination
      const [countResults ] : any = await database.query(countQuery, [`%${searchField}%`, `%${filter}%`]);
      const totalCount: number = countResults[0].totalItems;
      const totalPages: number = Math.ceil(totalCount / Number(itemsPerPage));
      
      
      const [tables] = await database.query(paginationQuery);
      
      

      res.json({ data: tables, totalPages }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private addTable = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {

      const { capacity } = req.body
      const [table] = await database.execute<ResultSetHeader>(
                        `INSERT INTO restaurantdatabase.tables 
                        (capacity) VALUES (?)`, [capacity]
                      );
      const table_id = table.insertId
      const orderTableLink = `http://localhost:3000/Order/table/${table_id}`
      const tableQrCode = await generateQRCodeDataURL(orderTableLink);
      const [addQR] = await database.execute<ResultSetHeader>(
        `Update restaurantdatabase.tables 
        SET QRcode = ? Where id = ?`, [tableQrCode,table_id]
      );
      
      res.json({ message: 'Table created successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  private editTable = async (req: Request, res: Response ) : Promise<Response | void> => {
    try {
      const table_id = req.params.id;
      
      const { capacity } = req.body
      const orderTableLink = `http://localhost:3000/Order/table/${table_id}`
      const tableQrCode = await generateQRCodeDataURL(orderTableLink);
      await database.execute(
        `Update restaurantdatabase.tables 
        SET capacity = ? , QRcode = ?  Where id = ?`,
        [capacity , tableQrCode , table_id]
      );
      
      res.json({ message: 'Table Updated successfully' });
    } catch (error) {
      console.error('Error :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

  
}

export {tablesController };



