// AdminPanel.js
import React from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 
import './AdminPanel.css';

const AdminPanel = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ajoutez votre logique de déconnexion ici, par exemple, réinitialiser le contexte d'authentification
    // dispatch({ type: 'LOGOUT' });

    // Rediriger vers l'écran d'accueil
    navigate('/');
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <span className="username">Bienvenue, {state.username}!</span>
        <FaUser className="admin-icon" />
        <button onClick={handleLogout} className="logout-button">
          Déconnexion
        </button>
      </div>
      <div className="admin-links">
        <Link to="/dashboard/tasks">Voir la liste des tâches</Link>
        <Link to="/dashboard/actions">Actions sur les tâches</Link>
      </div>
    </div>
  );
};

export default AdminPanel;
