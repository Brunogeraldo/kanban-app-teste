// src/AddTask.js
import React, { useState } from 'react';
import './AddTask.css'; // Importar o CSS

const AddTask = ({ onAddTask, status }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Média');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) return; // Validação simples
        onAddTask({ title, description, priority, status });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Título" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
            />
            <textarea 
                placeholder="Descrição" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
            </select>
            <button type="submit">Adicionar Tarefa</button>
        </form>
    );
};

export default AddTask;