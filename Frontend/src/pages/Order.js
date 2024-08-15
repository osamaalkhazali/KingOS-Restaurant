import React from 'react';
import './Order.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Contact() {
    return (
        <div className='order-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Order Now</h1>
                </div>
            </header>

            <div className='container my-5'>
              <div className='d-flex flex-wrap justify-content-center justify-content-md-evenly text-center '>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://framerusercontent.com/images/iP0BsyYh0IYgAchUCKTAQqclxyI.webp" />
              <Card.Body>
                <Card.Title>Delivery</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="danger">Order</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://cdn.ckitchen.com/img/blog/d4980721-0b56-496a-9f5f-0aace6150b69/631fc42a-6400-4a45-a7f9-5dc15057a9cf/restaurantdeliverysales-2308070y7hz6.webp" />
              <Card.Body>
                <Card.Title>In Restaurant</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="danger">Order</Button>
                </Card.Body>
            </Card>
            </div>
            
            </div>

            
        </div>
    )
}

export default Contact;