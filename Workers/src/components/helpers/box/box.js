import React from 'react'
import './box.css';

const Box = (props) => {
  return (
    <div className="card text-black box" >
      
      <div className="card-body p-md-5">
        {props.children}
      </div>
    </div>
  )
}

export default Box