import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext'; 

const UpdateTaskForm = ({ taskId }) => {
  const { authToken } = useContext(AuthContext); 
  const [updatedTask, setUpdatedTask] = useState('');

  const handleUpdateTask = async () => {
    const response = await fetch(`http://localhost:8000/api/user/tasks/${taskId}/`, {
      method: 'PUT',  
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`, 
      },
      body: JSON.stringify({ title: updatedTask }),
    });

    if (response.ok) {
      console.log('Tâche mise à jour avec succès');

    } else {
      console.error('Erreur lors de la mise à jour de la tâche');
    }
  };

  return (
    <div>
      <h3>Mettre à jour la tâche :</h3>
      <input type="text" value={updatedTask} onChange={(e) => setUpdatedTask(e.target.value)} />
      <button onClick={handleUpdateTask}>Mettre à jour</button>
    </div>
  );
};

export default UpdateTaskForm;
