import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Registration.css';

const Registration = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      const sanitizedUsername = e.target.value.replace(/[^a-zA-Z0-9@/./+/-/_]/g, '');
      setFormData({ ...formData, [e.target.name]: sanitizedUsername });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasGmailDomain = email.toLowerCase().includes('@gmail.com');
    return emailRegex.test(email) && hasGmailDomain;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    const hasNoLetters = /^\d+$/.test(phone);
    return phoneRegex.test(phone) && hasNoLetters;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();


  if (!validateEmail(formData.email)) {
    toast.error('Format d\'email invalide');
    return;
  }

  if (!validatePhone(formData.phone)) {
    toast.error('Le numéro de téléphone doit contenir 10 chiffres');
    return;
  }


  try {
    const response = await fetch('http://localhost:8000/api/sign-up/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        role: formData.role,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(`${formData.username} a été créé avec succès!`);
      setFormData({
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: '',
      });

     
      setTimeout(() => {
        switchToLogin();
      }, 6000);
    } else {
      toast.error(data.error || 'Erreur lors de l\'inscription');
    }
  } catch (error) {
    console.error('Erreur lors de la requête d\'inscription', error);
    toast.error('Erreur lors de la requête d\'inscription');
  }
};


  return (
    <div className="registration-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Téléphone:</label>
          <input type="text" name="phone" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <input type="text" name="address" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Rôle:</label>
          <select name="role" onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="simple-user">Simple User</option>
          </select>
        </div>

        <button type="submit">Inscription</button>
      </form>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Registration;
