import {  useEffect , useState } from 'react';
import  axios  from 'axios';
import Table from '../components/table/Table.js'
import Search from '../components/Search/Search.js'
import Pagination from '../components/pagination/pagination.js'
import { Link } from 'react-router-dom';
const moment = require('moment');


function Tables() {
  
    const [menuData, setMenuData] = useState([])
    const [searchField , setSearchField ] = useState('')
    const [searchKey , setSearchKey ] = useState('name')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [filterName, setFilterName] = useState('foodType');
    const [filterKeys, setFilterKeys] = useState([]);

    
    const headers  = ['#' , 'id' , 'Capacity' , 'QR', 'Created' , 'Updated' , 'Action']
    
    const menuContent = menuData.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{( ((currentPage -1) * itemsPerPage) + (menuData.indexOf(item) ) )}</th>
          <td> {item.id}</td>
          <td> {item.Capacity}</td>
          <td> 
            <img alt='Qr Code' 
            src={item.QRcode || 'https://cdn-icons-png.flaticon.com/512/5247/5247756.png'} 
            style={{ width: '150px' }} />
          </td>
          <td>{moment(item.Created_At).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td>{moment(item.Updated_At).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td><Link  to={`/tables/${item.id}`}>
          Edit
          </Link></td>
        </tr>
    )})
    
    
    useEffect(() => {
      const fetchAllUsers = async () => { 
          const link = 
          `http://localhost:4000/tables`
            
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
          setMenuData(response.data.data )
          setTotalPages(response.data.totalPages )
          // setFilterKeys(response.data.filterKeys || [])
          })
        .catch(error => {console.log(error)})
  
      };
      fetchAllUsers();
    }, [searchField , filter, filterName , searchKey ,currentPage , itemsPerPage ]);
  
    const searchKeys = ['Name','Description','Price','Created','Updated']
  
  
  return (
    <>
    
        <div className="title">
          <i className="uil uil-table"></i>
          <span className="text">Restaurant Tables</span>
        </div>
      
      <div className='link'>
      <Link  to={'/addtable'}>   
      <div className="add">
          <i className="uil uil-plus"></i>
          <span className="text">Add Table</span>
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
    data={menuContent}
    />
    <Pagination
            onPageChange={setCurrentPage} 
            pageCount={totalPages}
            forcePage={currentPage}
    />
    
    </>
  );
}


export default Tables;