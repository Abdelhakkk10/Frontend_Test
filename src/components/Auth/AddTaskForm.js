import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import './model.css'
const AddTaskForm = ({ closeModal }) => {
  const { authToken } = useContext(AuthContext);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/create-task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({ title: newTask, description }),
      });

      if (response.ok) {
        toast.success('Tâche ajoutée avec succès', { autoClose: 5000 });
        
        setNewTask('');
        setDescription('');
        
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de la tâche', errorData);
        toast.error('Erreur lors de l\'ajout de la tâche: ' + errorData.error, { autoClose: 5000 });
      }
    } catch (error) {
      console.error('Erreur lors de la requête d\'ajout de la tâche', error);
      toast.error('Erreur lors de la requête d\'ajout de la tâche: ' + error.message, { autoClose: 5000 });
    }
  };

  return (
    <div>
      <h3>Ajouter une nouvelle tâche :</h3>
      <div className="form-group">
        <label>Titre :</label>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Description :</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button onClick={handleAddTask}>Ajouter</button>

      <ToastContainer />
    </div>
  );
};

export default AddTaskForm;
