import React from 'react'

const TableBody = ({bodyData}) => {
  return (
    <tbody>
        {bodyData ? bodyData.map((row , index) => (
        <tr key={index}>
          {row.map((col, index) => (
            <td key={index}>{col}</td>
          ))}
          </tr>
        )) : <tr></tr>}
    </tbody>
  )
}

export default TableBody