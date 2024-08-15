/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react';
import  axios  from 'axios';
import { useNavigate} from 'react-router-dom'
import {Alert} from '../components/helpers/index.js'
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddWorker = () => {
  
  const navigate = useNavigate()


  const [isDisabled, setIsDisabled] = useState(false)
  const [validUsername, setValidUsername] = useState('')
  const [validEmail, setValidEmail] = useState('')
  const [validConfirmPassword, setValidConfirmPassword] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePassword = (e) => {
    handleChange(e);
    setFormData((prevData) => ({
      ...prevData,
      confirmPassword: '',
    }));
  };
  
  const handleConfirmPassword = (e) => {
    handleChange(e);
    const { value } = e.target;
    if (value !== formData.password ) {
      setValidConfirmPassword(<Alert type="danger" message={`Password dose not match`} />)
    } else if (value === '') 
    { setValidConfirmPassword('')
    } else {setValidConfirmPassword(<Alert type="success" message={`Password  match`} />) }
    
  };
  
  const handleUser = (e) => {
    const { name , value } = e.target;
    let setValid
    if (name === 'username') { setValid = setValidUsername} else { setValid = setValidEmail }
    axios.get(`http://localhost:4000/auth/allWorkers` , 
    {params : {
      [name] : value
    }, headers : {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
    })
    .then(data => {
      if (data.data.length > 0  && value.length > 0) {
        setValid(<Alert type="danger" message={`This ${name} is Not available`} />)
      } else if (value.length > 0) {
        setValid(<Alert type="success" message={`This ${name} is available`} />)
        handleChange(e)
      } else {
        setValid('')
        handleChange(e)
      }
    } )
    .catch(err => console.log(err));
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
          axios.post('http://localhost:4000/auth/addWorker', formData 
          , 
          {
            headers : {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
          }
        ).then( ()=> {
            setTimeout(() => {
              toast.success('Item Added!', {
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
                  navigate('/workers')
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
      Add Worker
      
        <label>
        Worker Name:
          <input
            type="text"
            name="name"
            autoComplete='on'
            onChange={handleChange}
            className="input-field"
            required
          />

        </label>
        
        <label>
          Username:
          <input
            type="text"
            name="username"
            autoComplete='on'
            onChange={handleUser}
            className="input-field"
            required
          />
          {validUsername}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            autoComplete='on'
            onChange={handleUser}
            className="input-field"
            required
          />
          {validEmail}
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handlePassword}
            className="input-field"
            required
          />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleConfirmPassword}
            className="input-field"
            required
          />
          {validConfirmPassword}
        </label>

        <button type="submit" disabled={isDisabled} className="submit-button">
          Add Worker
        </button>

        
        
      </form>
    


    <ToastContainer />

    </>
  )
}

export default AddWorker