// src/TaskModal.js
import './TaskModal.css';
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Para acessibilidade

const TaskModal = ({ isOpen, onRequestClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Baixa');
    const [status, setStatus] = useState('A Fazer');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask({ title, description, priority, status });
        setTitle('');
        setDescription('');
        setPriority('Baixa');
        setStatus('A Fazer');
        onRequestClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className="modal-content" 
            overlayClassName="modal-overlay"
        >
            <h2>Adicionar Tarefa</h2>
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
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)} 
                    required
                >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    required
                >
                    <option value="A Fazer">A Fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Concluído">Concluído</option>
                </select>
                <div className="modal-buttons">
                    <button type="submit">Adicionar</button>
                    <button type="button" onClick={onRequestClose}>Cancelar</button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;