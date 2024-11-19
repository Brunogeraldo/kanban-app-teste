// src/Kanban.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Kanban.css';
import TaskModal from './TaskModal';

const Kanban = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        doing: [],
        done: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentColumn, setCurrentColumn] = useState('');

    const addTask = (taskData) => {
        const { title, description, priority, status } = taskData;
        const newTask = { id: uuidv4(), title, description, priority, status };

        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            if (status === 'A Fazer') {
                updatedTasks.todo.push(newTask);
            } else if (status === 'Fazendo') {
                updatedTasks.doing.push(newTask);
            } else if (status === 'Concluído') {
                updatedTasks.done.push(newTask);
            }
            return updatedTasks;
        });
    };

    const moveTask = (taskId, from, to) => {
        const taskToMove = tasks[from].find(task => task.id === taskId);
        setTasks(prevTasks => {
            const newFromList = prevTasks[from].filter(task => task.id !== taskId);
            const newToList = [...prevTasks[to], taskToMove];
            return { ...prevTasks, [from]: newFromList, [to]: newToList };
        });
    };

    const openModal = (status) => {
        setCurrentColumn(status);
        setIsModalOpen(true);
    };

    return (
        <div className="kanban-container">
            {['todo', 'doing', 'done'].map((column, index) => (
                <div className="column" key={index}>
                    <h2>{column === 'todo' ? 'A Fazer' : column === 'doing' ? 'Fazendo' : 'Concluído'}</h2>
                    <button className="add-task-button" onClick={() => openModal(column)}>
                        +
                    </button>
                    <ul>
                        {tasks[column].map(task => (
                            <li key={task.id} className="task">
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <div>
                                    {column === 'todo' && (
                                        <>
                                            <button onClick={() => moveTask(task.id, 'todo', 'doing')}>Fazendo</button>
                                            <button onClick={() => moveTask(task.id, 'todo', 'done')}>Concluído</button>
                                        </>
                                    )}
                                    {column === 'doing' && (
                                        <>
                                            <button onClick={() => moveTask(task.id, 'doing', 'todo')}>A Fazer</button>
                                            <button onClick={() => moveTask(task.id, 'doing', 'done')}>Concluído</button>
                                        </>
                                    )}
                                    {column === 'done' && (
                                        <>
                                            <button onClick={() => moveTask(task.id, 'done', 'doing')}>Fazendo</button>
                                            <button onClick={() => moveTask(task.id, 'done', 'todo')}>A Fazer</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <TaskModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                onAddTask={addTask} 
                status={currentColumn} 
            />
        </div>
    );
};

export default Kanban;