import React, { useState } from 'react';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import UpdateTaskForm from './UpdateTaskForm';
import DeleteTaskButton from './DeleteTaskButton';

const Dashboard = () => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'viewTasks':
        return <TaskList closeModal={closeModal} />;
      case 'updateTask':
        // You need to provide the task ID to update
        return <UpdateTaskForm taskId={1} closeModal={closeModal} />;
      case 'deleteTask':
        // You need to provide the task ID to delete
        return <DeleteTaskButton taskId={1} closeModal={closeModal} />;
      default:
        return null;
    }
  };

  const renderAddTaskForm = () => {
    if (modalContent === 'addTask') {
      return <AddTaskForm closeModal={closeModal} />;
    }
  };

  return (
    <div>
      <h1>Tableau de bord</h1>
      <div className="admin-links">
        <button onClick={() => openModal('viewTasks')}>Voir la liste des tâches</button>
        <button onClick={() => openModal('addTask')}>Ajouter une tâche</button>
        <button onClick={() => openModal('updateTask')}>Mettre à jour une tâche</button>
        <button onClick={() => openModal('deleteTask')}>Supprimer une tâche</button>
      </div>
      {renderAddTaskForm()}
      {modalContent && modalContent !== 'addTask' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal">
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
