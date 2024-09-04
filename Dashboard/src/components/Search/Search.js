import React from 'react'
import './filter.css'

const Search = ({ searchKeys ,handleSearchKey, handleSearchField ,
                        handleCurrentPage , handleFilter , handleFilterName,
                        filterKeys , handleItemsPerPage }) => {


                          
  const handleSearch = (e) => {
    handleSearchKey(e.target.value)
  }
  
  const handleSearchText = (e) => {
    handleSearchField(e.target.value)
  }
  
  const handleItems = (e) => {
    handleItemsPerPage(e.target.value)
    handleCurrentPage(1)
  }
  
  const handleFilterField = (e ) => {
    if (e.target.value === 'all') {
      handleFilter('')
      handleCurrentPage(1)
    } else {
      handleFilter(e.target.value)
      handleCurrentPage(1)
    }
  }
  
  
  
  return (
    <>
      <div className="filter-container">
        
        
        <div className='firstBar'>
        <div>
          <label className="label-filter" htmlFor="filter">
            Filter
          </label>
          <select
            className="select-filter"
            name="filter"
            id="filter"
            onChange={handleFilterField}
          >
            <option value="all">All</option>
            {filterKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        
        
         <div className='searchBar'>     
        <div>
          <input
            className="input-search"
            type="text"
            id="search"
            placeholder="Search"
            onChange={handleSearchText}
          />
        </div>

        <div>
          <select
            className="select-search-key"
            name="searchKey"
            id="searchKey"
            onChange={handleSearch}
          >
            {searchKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        </div>
        </div>
        
        
        <div className='count'>
        <label className="" htmlFor="filter">
            Per Page 
            <select
            className="select-filter-key"
            name="filterKey"
            id="filterKey"
            onChange={handleItems}
          >
              <option  value={5}>5</option>
              <option  value={10}>10</option>
              <option  value={15}>15</option>
              <option  value={20}>20</option>
              <option  value={50}>50</option>
              <option  value={100}>100</option>
          </select>
          </label>
          
        </div>
      </div>

    </>
    
  )
}

export default Search