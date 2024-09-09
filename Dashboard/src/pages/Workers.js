import {  useEffect , useState } from 'react';
import  axios  from 'axios';
import Table from '../components/table/Table.js'
import Search from '../components/Search/Search'
import Pagination from '../components/pagination/pagination'
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DeletePopup from '../components/helpers/deletePopup/deletePopup.js';
const moment = require('moment');


function Workers() {
  
    const [workersData, setWorkersData] = useState([])
    const [searchField , setSearchField ] = useState('')
    const [searchKey , setSearchKey ] = useState('name')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filter, setFilter] = useState('');
    const [filterName, setFilterName] = useState('Position');
    const [filterKeys, setFilterKeys] = useState([]);
    const [status, setStatus] = useState('all');

    
    const handleDelete = (itemId) => {    
      axios.delete(`http://localhost:4000/auth/workers/${itemId}` ,
      {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      }
    )
      .then( )
      .catch(err => console.log(err));
    }
    
    const headers  = ['#' , 'Id' , 'Name' , 'Username' , 'Email' , 'Position' , 'Created' , 'Updated' , 'Status' , 'Action']
    

    const tableContent = workersData.map(worker => {
          const rowNum = ( ((currentPage -1) * itemsPerPage) + (workersData.indexOf(worker) + 1) )
          const workerStatus = worker.status === "1" ? <b className='text-danger'>Inactive</b> : <b className='text-success'>Active</b>
          const createdFormat = moment(worker.Created_At).format('YYYY-MM-DD HH:mm:ss')
          const updatedFormat = moment(worker.Updated_At).format('YYYY-MM-DD HH:mm:ss')
          const dropdown = <Dropdown>
                              <Dropdown.Toggle variant="secondary" id="dropdown-basic"> </Dropdown.Toggle>
                              <Dropdown.Menu>
                                  {worker.status === "0" ? <>
                                    <Dropdown.Item href="#"><DeletePopup handleDelete={handleDelete} itemId={worker.id} text={"Fire This Worker"}/></Dropdown.Item> 
                                    <Dropdown.Item href={`workers/${worker.id}`}>Edit Info/Position</Dropdown.Item>
                                    </>
                                    : ''}
                              </Dropdown.Menu>
                            </Dropdown> 
          const rowsContent = [rowNum , worker.id , worker.Name  , worker.Username , worker.Email,
                                worker.Position  , createdFormat ,updatedFormat , workerStatus , dropdown ]
      return (
        rowsContent
    )})
    
    
    useEffect(() => {
      const fetchAllUsers = async () => { 
          const link = 
          `http://localhost:4000/auth/workers`
            
          axios.get(link , { 
            params : {
            searchField : searchField,
            searchKey : searchKey,
            filter : filter,
            filterName : filterName,
            currentPage : currentPage,
            itemsPerPage : itemsPerPage,
            status : status ,
          }, 
          headers : {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        } )
        .then(response => {;
          setWorkersData(response.data.data )
          setTotalPages(response.data.totalPages )
          setFilterKeys(response.data.filterKeys || [])
          })
        .catch(error => {console.log(error)})
  
      };
      fetchAllUsers();
    }, [searchField , filter, filterName , searchKey ,currentPage , itemsPerPage , status ]);
  
    const searchKeys = ['Name','Username','Email','Created','Updated']
  
    
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
    
  return (
    <>
    
        <div className="title">
          <i className="uil uil-user"></i>
          <span className="text">Workers</span>
        </div>
      
      <div className='link'>
      <Link  to={'/addWorker'}>   
      <div className="add">
          <i className="uil uil-plus"></i>
          <span className="text">Add Worker</span>
      </div>
      </Link> 
      </div>
    
      <input type="radio" id="all" name="status" value="all" onChange={handleStatusChange} checked={status === 'all'} />
      <label htmlFor="all">All</label>

      <input type="radio" id="active" name="status" value="active" onChange={handleStatusChange} checked={status === 'active'} />
      <label htmlFor="active">Active</label>

      <input type="radio" id="inactive" name="status" value="inactive" onChange={handleStatusChange} checked={status === 'inactive'} />
      <label htmlFor="inactive">Inactive</label>
    
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
    data={tableContent}
    />
    <Pagination
            onPageChange={setCurrentPage} 
            pageCount={totalPages}
            forcePage={currentPage}
    />
    
    </>
  );
}


export default Workers;