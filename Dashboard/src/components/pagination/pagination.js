import React from 'react'
import ReactPaginate from 'react-paginate';
import './pagination.css'

const Pagination = ({onPageChange,pageCount,forcePage }) => {
  
  const handlePageClick = (selectedPage) => {
    onPageChange(selectedPage.selected + 1);
  };

  return (
    <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={forcePage - 1}
            />
  )
}

export default Pagination