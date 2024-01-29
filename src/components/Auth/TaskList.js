import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TaskList = () => {
  const { state } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/tasks/', {
          headers: {
            Authorization: `Token ${state.authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des tâches');
        }

        const data = await response.json();

        // Log pour voir les données récupérées
        console.log('Données récupérées depuis la requête GET :', data);

        // Assurez-vous que data est un tableau avant de le définir comme état
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          throw new Error('Les données reçues ne sont pas au format attendu');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTasks();
  }, [state.authToken]);

  return (
    <div>
      <h3>Liste des tâches :</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titre</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
