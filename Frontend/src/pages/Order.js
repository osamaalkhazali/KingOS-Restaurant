/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import './Order.css';
import { Card, Button, Form } from 'react-bootstrap';
import  axios  from 'axios';


function Order() {

  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])
  const [dessert, setDessert] = useState([])
  const [drinks, setDrinks] = useState([])
  
  const [isDisabled, setIsDisabled] = useState(true)
  const [customerName, setCustomerName] = useState('Guest');
  const [notes, setNotes] = useState('');
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('0');
  
    const addToCart = (item) => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        setCart(cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    };

    const updateCartItem = (id, quantity) => {
      setCart(cart.map(cartItem =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      ));
    };

    const removeFromCart = (id) => {
      setCart(cart.filter(cartItem => cartItem.id !== id));
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  useEffect(() => {
    const fetchAllUsers = async () => { 
        const link = 
        `http://localhost:4000/menu`
        axios.get(link)
        .then(response => {
        setBreakfast(response.data.data.filter(item => item.foodType === "BREAKFAST"))
        setLunch(response.data.data.filter(item => item.foodType === "LUNCH"))
        setDinner(response.data.data.filter(item => item.foodType === "DINNER"))
        setDessert(response.data.data.filter(item => item.foodType === "DESSERT"))
        setDrinks(response.data.data.filter(item => item.foodType === "DRINKS"))
    
        })
        .catch(error => {console.log(error)})
    };
    fetchAllUsers();
}, [])

const handleSubmit = e => {
    e.preventDefault();
    setIsDisabled(true)
    const link = 
    `http://localhost:4000/order`
    axios.post(link , {cart , notes , totalPrice , customerName , tableNumber} )
    .then(response => {
      console.log('Order placed successfully:', response.data);
    })
    .catch(error => {console.log(error)})
}

console.log({cart , notes , totalPrice , customerName})


    return (
        <div className='order-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Order Now</h1>
                </div>
            </header>


            <div className='container my-5 orderOrder'>
              
                <div className="orderMenu">
                
                <nav id="navbar-example2" className="navbar navbar-expand-lg bg-food-primary px-3 mb-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link food-nav-link" href="#scrollspyHeading1">BREAKFAST</a>
          </li>
          <li className="nav-item">
            <a className="nav-link food-nav-link" href="#scrollspyHeading2">LUNCH</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle food-nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">More</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#scrollspyHeading3">DINNER</a></li>
              <li><a className="dropdown-item" href="#scrollspyHeading4">DESSERT</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#scrollspyHeading5">DRINKS</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-smooth-scroll="true" className="scrollspy-example p-3 rounded-2" tabIndex="0">
        <h4 id="scrollspyHeading1" className="section-heading">Breakfast</h4>
        {breakfast.map(item => (
          <Card key={item.id} className="food-card">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
              <Card.Text>
                {item.price}$
              </Card.Text>
              <Button onClick={() => {addToCart(item) ;setIsDisabled(false)}}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}

        <h4 id="scrollspyHeading2" className="section-heading">Lunch</h4>
        {lunch.map(item => (
          <Card key={item.id} className="food-card">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
              <Card.Text>
                {item.price}$
              </Card.Text>
              <Button onClick={() => {addToCart(item) ;setIsDisabled(false)}}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}

        <h4 id="scrollspyHeading3" className="section-heading">Dinner</h4>
        {dinner.map(item => (
          <Card key={item.id} className="food-card">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
              <Card.Text>
                {item.price}$
              </Card.Text>
              <Button onClick={() => {addToCart(item) ;setIsDisabled(false)}}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}

        <h4 id="scrollspyHeading4" className="section-heading">Dessert</h4>
        {dessert.map(item => (
          <Card key={item.id} className="food-card">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
              <Card.Text>
                {item.price}$
              </Card.Text>
              <Button onClick={() => {addToCart(item) ;setIsDisabled(false)}}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}

        <h4 id="scrollspyHeading5" className="section-heading">Drinks</h4>
        {drinks.map(item => (
          <Card key={item.id} className="food-card">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.description}</Card.Subtitle>
              <Card.Text>
                {item.price}$
              </Card.Text>
              <Button onClick={() => {addToCart(item) ;setIsDisabled(false)}}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
</div>

    <div className="cart">
      
    <div className="cart-container mt-5 p-4 bg-light rounded">
        <h4>Your Cart</h4>
        <Form.Group controlId="tableNumber">
          <Form.Label>Table Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your table number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </Form.Group>

        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <Card key={item.id} className="food-card mb-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className="mb-0">{item.name}</Card.Title>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItem(item.id, parseInt(e.target.value, 10))}
                      min="1"
                      className="quantity-input"
                    />
                  </div>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)} className="remove-btn">
                    x
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}

        <Form.Group controlId="customerName">
          <Form.Label>Your Name (optional)</Form.Label>
          <Form.Control
            
            rows={3}
            placeholder="Your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
        
        <Form.Group controlId="notes">
          <Form.Label>Notes (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add any special requests or notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
        
        <h5 className="total-price">Total Price: {totalPrice}$</h5>
        
        <Button disabled={isDisabled} variant="primary" onClick={handleSubmit} className="place-order-btn">Place Order</Button>
      </div>
      
      </div> 
    
</div>
  
        </div>
    )
}

export default Order;













            /* <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://framerusercontent.com/images/iP0BsyYh0IYgAchUCKTAQqclxyI.webp" />
              <Card.Body>
                <Card.Title>Delivery</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="danger">Order</Button>
                </Card.Body>
            </Card> */
            /* <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://cdn.ckitchen.com/img/blog/d4980721-0b56-496a-9f5f-0aace6150b69/631fc42a-6400-4a45-a7f9-5dc15057a9cf/restaurantdeliverysales-2308070y7hz6.webp" />
              <Card.Body>
                <Card.Title>In Restaurant</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="danger">Order</Button>
                </Card.Body>
            </Card> */