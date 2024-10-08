import React from 'react'
import TableHeader from "./tHeader/tHeader.js";
import TableBody from "./tBody/tbody.js";
import './table.css'


const Table = ({tableHeaders , data}) => {
  return (
    <table className="table table-striped table-hover">
      <TableHeader tableHeaders={tableHeaders}/>
      <TableBody    bodyData={data} />
    </table>
  )
}

export default Table 