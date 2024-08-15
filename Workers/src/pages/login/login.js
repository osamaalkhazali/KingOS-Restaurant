import React from 'react';
import { useState , useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Title, Alert } from '../../components/helpers/index';
import './login.css'; 
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();

  const [validUsername, setValidUsername] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [validSubmit, setValidSubmit] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUsername = (e) => {
    handleChange(e);
    const { value } = e.target;
    if (value === '') {
      setValidUsername(<Alert type="danger" message={`Username cannot be empty`} />);
    } else {
      setValidUsername('');
    }
  };

  const handlePassword = (e) => {
    handleChange(e);
    const { value } = e.target;

    if (value === '') {
      setValidPassword(<Alert type="danger" message={`Password cannot be empty`} />);
    } else {
      setValidPassword('');
    }
  };

  
  const { login } = useContext(AuthContext)
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validUsername === '' && validPassword === '') {
      setValidSubmit(<Alert type="warning" message={`Login in progress`} />);
      axios
        .post(`http://localhost:4000/auth/login`, formData)
        .then(async (res) => {
          setValidSubmit(<Alert type="success" message={`Login successful`} />);
          localStorage.setItem('accessToken', res.data.accessToken ); 
          console.log(res.data.validToken)
          await login(res.data.validToken)
          navigate('/'); 
        })
        .catch((error) => {
          setValidSubmit(<Alert type="danger" message={`Invalid username or password`} />);
          console.error('Error:', error);
        });
    } else {
      setValidSubmit(<Alert type="danger" message={`Please check your login credentials`} />);
    }
  };

  return (
    <>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <Title>KingOS Restaurant
            <br/>
            Workers Panel
          </Title>
          

          <label>
            Username:
            <input
              type="text"
              name="username"
              autoComplete="on"
              onChange={handleUsername}
              className="input-field"
              required
            />
            {validUsername}
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
            {validPassword}
          </label>

          <button type="submit" className="submit-button">
            Login
          </button>
          {validSubmit}


        </form>
      </div>
    </>
  );
};

export default Login;
