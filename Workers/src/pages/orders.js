import React from 'react';
import {  useEffect , useState } from 'react';
import  axios  from 'axios';
import Table from '../components/table/Table.js'
import Search from '../components/Search/Search'
import Pagination from '../components/pagination/pagination'
import { Link } from 'react-router-dom';
import socket from '../servers/socket.js';
const moment = require('moment');



function Orders() {
  
    const [ordersData, setOrdersData] = useState([])
    const [ordersItemsData, setOrdersItemsData] = useState([])
    
    // search and pagination
    const [searchField , setSearchField ] = useState('')
    const [searchKey , setSearchKey ] = useState('created_at')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filter, setFilter] = useState('');
    const [filterName, setFilterName] = useState('table_id');
    const [filterKeys, setFilterKeys] = useState([]);

    
    const headers  = ['Order ID	' , 'Table ID	' , 'Items Ordered' , 'Notes', 'Total Amount	' , 'Confirmed Order' , 'Order Date' , 'Updated At' , 'Action']
    
    const ordersContent = ordersData.map((item, index) => {
      return (
          <tr key={'order:'+item.id }>
              <th scope="row">
                  {item.id}
              </th>
              <td>{item.table_id}</td>
              <td>{ordersItemsData.filter(order => order.order_id === item.id).map((items, index) => {
                  return (<React.Fragment key={index}>
                          {'- ' + items.name + ' X' + items.quantity + ' (' + items.price + '$)'}
                          <br />
                          </React.Fragment>) } )}</td>
              <td>{item.notes || '----'}</td>
              <td>{item.Total_Amount}$</td>
              <td>{item.Confirmed_Order ? 'Yes' : 'No'}</td>
              <td>{moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss')}</td>
          </tr>
      );
  })
    
    
    useEffect(() => {
      const fetchAllData = async () => { 
          const link = 
          `http://localhost:4000/order`
            
          axios.get(link , { 
            params : {
            searchField : searchField,
            searchKey : searchKey,
            filter : filter,
            filterName : filterName,
            currentPage : currentPage,
            itemsPerPage : itemsPerPage
          },  
          headers : {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        } ) 
        .then(response => {;
          setOrdersData(response.data.data )
          setOrdersItemsData(response.data.ordersItems)
          setTotalPages(response.data.totalPages )
          setFilterKeys(response.data.filterKeys || [])
          })
        .catch(error => {console.log(error)})
  
      };
      fetchAllData();
      socket.on('reloadOrders', data => {
        fetchAllData();
      })
    }, [searchField , filter, filterName , searchKey ,currentPage , itemsPerPage ]);
  
    const searchKeys = ['Order Date']
  
  
  return (
    <>
    
        <div className="title">
          <i className="uil uil-utensils-alt"></i>
          <span className="text">Food Menu</span>
        </div>
      
      <div className='link'>
      <Link  to={'/addFoodItem'}>   
      <div className="add">
          <i className="uil uil-plus"></i>
          <span className="text">Add Item</span>
      </div>
      </Link> 
      </div>
    
    <Search
    searchKeys={searchKeys}
    filterKeys={filterKeys}
    handleSearchKey={setSearchKey}
    handleCurrentPage={setCurrentPage}
    handleFilter={setFilter}
    handleFilterKey={setFilterName}
    handleSearchField={setSearchField}
    handleItemsPerPage={setItemsPerPage}
    />

    
    <Table
    tableHeaders={headers}
    data={ordersContent}
    />
    <Pagination
            onPageChange={setCurrentPage} 
            pageCount={totalPages}
            forcePage={currentPage}
    />
    
    </>
  );
}


export default Orders;