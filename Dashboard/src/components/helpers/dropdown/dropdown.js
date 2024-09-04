import React from 'react'

const Dropdown = (props) => {

  return (
    <div className="dropdown ms-auto">
      <i className="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul className="dropdown-menu">
          {props.children.map((child, index) => (
            <li key={index}>
              <div className="dropdown-item">
                {child}
              </div>
            </li>
            ))}
        </ul>
</div>
  )
}

export default Dropdown