/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import './Order.css';
import  axios  from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import TableCard from "../components/tableCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function Tables() {
  
  const [tables, setTables] = useState([])
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tables = await axios.get('http://localhost:4000/tables/order');
        setTables(tables.data)
        const tablesCount = await axios.get('http://localhost:4000/tables/count');
        const rowsCount = Math.ceil(tablesCount.data[0].count / 4); 
        setRows(Array.from({ length: rowsCount }, (_, index) => index + 1)); 
      } catch (error) {
        console.error('Error fetching table :', error);
      }
    };

    fetchTables();
  }, []);
  

    return (
      <>
        <div className='order-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Order Now</h1>
                </div>
                
            </header>

            <Container>
          {rows.map((row,index) => {
            return (
                    <Row key={index} >
                    {tables.filter(t =>  t.id >= (row-1)*4 && t.id < row *4)
                      .map(table => {
                        return (
                          <Col key={table.id}>
                          <TableCard
                          tableNumber={table.id}
                          tableCapacity={table.Capacity}
                          tableQR={table.QRcode || 'https://cdn-icons-png.flaticon.com/512/5247/5247756.png'}
                          tableOrderLink={`/order/table/${table.id}/${table.Link}`}
                          />
                          </Col>
                        )
                      })
                    }
                    </Row>
                    )
          })}
              
          </Container>
          </div>
        </>
  
)
}

export default Tables;

