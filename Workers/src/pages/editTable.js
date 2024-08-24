/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react';
import  axios  from 'axios';
import { useNavigate} from 'react-router-dom'
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Title} from '../components/helpers/index'
import { useParams } from 'react-router-dom';


const EditTable = () => {
  
  const navigate = useNavigate()
  
  const { id } = useParams();

  const [isDisabled, setIsDisabled] = useState(false)

  const [formData, setFormData] = useState({
    capacity: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = e => {
          e.preventDefault();
          setIsDisabled(true)
          toast('In Progress!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            })
          axios.put(`http://localhost:4000/tables/${id}`, formData 
          , 
          {
            headers : {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
          }
        ).then( ()=> {
            setTimeout(() => {
              toast.success('Table Updated!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "dark",
                transition: Slide,
                })
                setTimeout(() => {
                  navigate('/tables')
                },1500)
            }, 1500);})
          .catch(err => {
            setTimeout(() => {
              toast.error('Network Error!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "dark",
                transition: Slide,
                });
                setIsDisabled(false)
            }, 1500);
            console.log(err)});       
              }
  
    
  return (
    <>
    
    
    <form onSubmit={handleSubmit} className="row g-3">
      Edit Table
      <Title>Edit Table {id}</Title>
      
        <label>
        Table Capacity:
          <input
            type="number"
            name="capacity"
            autoComplete='on'
            onChange={handleChange}
            className="input-field"
            required
          />

        </label>
        
        <button type="submit" disabled={isDisabled} className="submit-button">
          Edit Table
        </button>

        
        
      </form>
    


    <ToastContainer />

    </>
  )
}

export default EditTable