import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useAuth } from './AuthContext';
const DeleteTaskButton = ({ taskId }) => {
  const { authToken } = useContext(AuthContext); 
  const handleDeleteTask = async () => {
    const response = await fetch(`http://localhost:8000/api/user/tasks/${taskId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${authToken}`, 
      },
    });

    if (response.ok) {
      console.log('Tâche supprimée avec succès');
      
    } else {
      console.error('Erreur lors de la suppression de la tâche');
    }
  };

  return (
    <button onClick={handleDeleteTask}>Supprimer la tâche</button>
  );
};

export default DeleteTaskButton;
