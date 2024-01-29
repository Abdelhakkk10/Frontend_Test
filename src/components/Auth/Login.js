import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard'; 
import './Login.css';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSuccess = (message) => {
    toast.success(message, { autoClose: 5000 });
    setTimeout(() => {
      setLoggedIn(true);
      onLogin(); // Call the parent login function
    }, 6000); // Redirect after 6 seconds
  };

  const handleError = (error) => {
    toast.error(error, { autoClose: 5000 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/sign-in/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!', data);
        handleSuccess('Login successful!');
      } else {
        const errorData = await response.json();
        console.error('Error during login', errorData);
        handleError('Error during login: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error during login request', error);
      handleError('Error during login request: ' + error.message);
    }
  };

  if (loggedIn) {
    return <Dashboard />; 
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
