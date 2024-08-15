import React from 'react';
import './alert.css';

const Alert = ({ type, message }) => {
  return (
    <div className={`custom-alert custom-alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;