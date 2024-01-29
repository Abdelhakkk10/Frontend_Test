
import React from 'react';
import { Link } from 'react-router-dom';

const TaskActions = () => {
  return (
    <div>
      <h2>Actions sur les tâches</h2>
      <div>
        <Link to="/dashboard/tasks">Voir la liste des tâches</Link>
      </div>
      <div>
        <Link to="/dashboard/actions/add">Ajouter une nouvelle tâche</Link>
        <Link to="/dashboard/actions/update">Mettre à jour une tâche</Link>
        <Link to="/dashboard/actions/delete">Supprimer une tâche</Link>
      </div>
    </div>
  );
};

export default TaskActions;
