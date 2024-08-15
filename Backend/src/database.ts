import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',  // Replace with your database host
  user: 'root',       // Replace with your database user
  password: 'osama123', // Replace with your database password
  database: 'restaurantdatabase', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

testConnection();

const database = pool;


export default database;

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('restaurantdatabase', 'root', 'osama123', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// async function testConnection() : Promise<void> {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }


// export { sequelize, testConnection };