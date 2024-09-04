import React from 'react'

const TableHeader = ({tableHeaders}) => {
  return (
    <thead>
      <tr>
        {tableHeaders.map(th => (
          <th key={th} scope="col">{th}</th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader