import React from 'react';
import  axios  from 'axios';
import {  useEffect , useState } from 'react';
import './Menu.css';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import BreakfastImg from '../utils/img/breakfast.jpg';
import LunchImg from '../utils/img/lunch.jpg';
import DinnerImg from '../utils/img/dinner.jpg';
import DessertImg from '../utils/img/dessert.jpg';


function Menu() {
    
    const [breakfast, setBreakfast] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])
    const [dessert, setDessert] = useState([])
    
    
    
    useEffect(() => {
        const fetchAllUsers = async () => { 
            const link = 
            `http://localhost:4000/menu`
            
            axios.get(link)
            .then(response => {; 
            setBreakfast(response.data.filter(item => item.Food_Type === "BREAKFAST"))
            setLunch(response.data.filter(item => item.Food_Type === "LUNCH"))
            setDinner(response.data.filter(item => item.Food_Type === "DINNER"))
            setDessert(response.data.filter(item => item.Food_Type === "DESSERT"))
            })
            .catch(error => {console.log(error)})
        };
        fetchAllUsers();
    }, [])
    

    return (
        <div className='menu-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Menu</h1>
                </div>
            </header>
            
            <div className='breakfast my-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Breakfast</h2>
                    <div className='row flex-column-reverse flex-lg-row'>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <img src={BreakfastImg} className='img-fluid w-75 mt-4 mt-lg-0' alt="" />
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-around'>
                            {breakfast.map((breakfast) => (
                                <div key={breakfast.id}>
                                    <Card className='border-0'>
                                        <CardBody>
                                            <CardTitle className='text-center fs-3'>
                                                {breakfast.Name}
                                            </CardTitle>
                                            <CardText className='text-center fs-5'>
                                                {breakfast.Description}
                                            </CardText>
                                            <CardText className='text-center fs-3 fw-bold text-success'>
                                                {breakfast.Price}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='lunch bg-dark text-light py-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Lunch</h2>
                    <div className='row'>
                        <div className='col-lg-6 d-flex flex-column justify-content-around'>
                            {lunch.map((lunch) => (
                                <div key={lunch.id}>
                                    <Card className='border-0 bg-dark text-light'>
                                        <CardBody>
                                            <CardTitle className='text-center fs-3'>
                                                {lunch.Name}
                                            </CardTitle>
                                            <CardText className='text-center fs-5'>
                                                {lunch.Description}
                                            </CardText>
                                            <CardText className='text-center fs-3 fw-bold text-success'>
                                                {lunch.Price}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <img src={LunchImg} className='img-fluid w-75 mt-4 mt-lg-0' alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='dinner my-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Dinner</h2>
                    <div className='row flex-column-reverse flex-lg-row'>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <img src={DinnerImg} className='img-fluid w-75 mt-4 mt-lg-0' alt="" />
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-around'>
                            {dinner.map((dinner) => (
                                <div key={dinner.id}>
                                    <Card className='border-0'>
                                        <CardBody>
                                            <CardTitle className='text-center fs-3'>
                                                {dinner.Name}
                                            </CardTitle>
                                            <CardText className='text-center fs-5'>
                                                {dinner.Description}
                                            </CardText>
                                            <CardText className='text-center fs-3 fw-bold text-success'>
                                                {dinner.Price}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='dessert bg-dark text-light py-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Dessert</h2>
                    <div className='row'>
                        <div className='col-lg-6 d-flex flex-column justify-content-around'>
                            {dessert.map((dessert) => (
                                <div key={dessert.id}>
                                    <Card className='border-0 bg-dark text-light'>
                                        <CardBody>
                                            <CardTitle className='text-center fs-3'>
                                                {dessert.Name}
                                            </CardTitle>
                                            <CardText className='text-center fs-5'>
                                                {dessert.Description}
                                            </CardText>
                                            <CardText className='text-center fs-3 fw-bold text-success'>
                                                {dessert.Price}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <img src={DessertImg} className='img-fluid w-75 mt-4 mt-lg-0' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;