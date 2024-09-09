import React from 'react'
import './box.css';

const Box = (props) => {
  const { title, children , } = props;
  
  return (
    <div className="card text-black box" >
      <h1>{title}</h1>
      <div className="card-body p-md-5 boxBody">
        {children}
      </div>
    </div>
  )
}

export default Box