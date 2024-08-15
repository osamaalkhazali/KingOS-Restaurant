/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useEffect } from 'react';
import  axios  from 'axios';
import { useNavigate} from 'react-router-dom'
// import { useAuth } from '../../context/authContext';
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddItem = () => {
  
  const navigate = useNavigate()
  // const { user } = useAuth();

  const [isDisabled, setIsDisabled] = useState(false)
  
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    foodType: '',
  });
  
  const [foodType, setFoodType] = useState([])
  
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
          axios.post('http://localhost:4000/menu', values 
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
                  navigate('/menu')
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
  
  useEffect(() => {
    const fetchAllUsers = async () => { 
      const link = 
      `http://localhost:4000/menu/types`
      axios.get(link 
        , 
        {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      }
    )
    .then(response => {;
      setFoodType(response.data)
      })
    .catch(error => {console.log(error)})
      };
    fetchAllUsers();
    }, [])
  
    
  return (
    <>


        <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-12">
        <label htmlFor="name" className="form-label">Food Item Name</label>
        <input type="text" className="form-control" name="name" id="title" placeholder="Food Item Name" required
          onChange={e => { setValues({ ...values, name: e.target.value }) }} />
      </div>
      <div className="col-12">
        <label htmlFor="description" className="form-label">Food Item Description</label>
        <textarea className="form-control" id="description" name="description" required
          onChange={e => { setValues({ ...values, description: e.target.value }) }}></textarea>
      </div>
      <div className="col-12">
        <label htmlFor="price" className="form-label">Price</label>
        <input type="number" step="0.01" className="form-control" name="price" id="price" placeholder="Price" required
          onChange={e => { setValues({ ...values, price: e.target.value }) }} />
      </div>
      <div className="col-12">
        <label htmlFor="FoodType" className="form-label">Food Category</label>
        <select name="FoodType" id="FoodType" className="form-select form-control" required
          onChange={e => { setValues({ ...values, foodType: e.target.value }) }}>
            {foodType.map(foodType => <option key={foodType.Food_Type} value={foodType.Food_Type}>{foodType.Food_Type}</option> )}
        </select>
      </div>
      <div className="col-12">
        <button disabled={isDisabled} type="submit" className="btn btn-primary">ADD Item</button>
      </div>
    </form>
    <ToastContainer />
 
    </>
  )
}

export default AddItem