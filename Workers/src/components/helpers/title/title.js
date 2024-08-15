import React from 'react'
import './title.css'

const Title = (props) => {
  return (
    <div className="custom-title">
      <h1>{props.children}</h1>
    </div>
  )
}

export default Title