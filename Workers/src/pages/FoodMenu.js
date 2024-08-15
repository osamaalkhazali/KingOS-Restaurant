import {  useEffect , useState } from 'react';
import  axios  from 'axios';
import Table from '../components/table/Table.js'
import Search from '../components/Search/Search'
import Pagination from '../components/pagination/pagination'
import { Link } from 'react-router-dom';
const moment = require('moment');


function FoodMenu() {
  
    const [menuData, setMenuData] = useState([])
    const [searchField , setSearchField ] = useState('')
    const [searchKey , setSearchKey ] = useState('name')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filter, setFilter] = useState('');
    const [filterName, setFilterName] = useState('foodType');
    const [filterKeys, setFilterKeys] = useState([]);

    
    const headers  = ['Id' , 'Name' , 'Description' , 'Price' , 'Food Type' , 'Created' , 'Updated' , 'Action']
    
    const menuContent = menuData.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{( ((currentPage -1) * itemsPerPage) + (menuData.indexOf(item) + 1) )}</th>
          <td> {item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.foodType}</td>
          <td>{moment(item.created).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td>{moment(item.updated).format('YYYY-MM-DD HH:mm:ss')}</td>
          
        </tr>
    )})
    
    
    useEffect(() => {
      const fetchAllUsers = async () => { 
          const link = 
          `http://localhost:4000/menu`
            
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
          setFilterKeys(response.data.filterKeys || [])
          })
        .catch(error => {console.log(error)})
  
      };
      fetchAllUsers();
    }, [searchField , filter, filterName , searchKey ,currentPage , itemsPerPage ]);
  
    const searchKeys = ['Name','Description','Price','Created','Updated']
  
  
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


export default FoodMenu;