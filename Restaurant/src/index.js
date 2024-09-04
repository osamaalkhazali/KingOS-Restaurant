import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Tables from './pages/Tables';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <>
    <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/order' element={<Tables />} />
          <Route path='/order/table/:id' element={<Order />} />
          <Route path='/order/table/:tableID/:link' element={<Order />} />
          <Route path='/contact' element={<Contact />} /> 
        </Route>
    </Routes>
  </>
  </BrowserRouter>
);


reportWebVitals();
