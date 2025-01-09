import React, { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const AddUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/add', {
                username,
                password,
                role
            });
            if (response.status === 201) {
                alert('Utilisateur ajouté avec succès');
                setUsername('');
                setPassword('');
                setRole('');
            }
        } catch (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur', err.response?.data || err);
            alert('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    return (
        <div className="add-user-form">
            <h2>Ajouter un Utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rôle:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Sélectionnez un rôle</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit">Ajouter l'utilisateur</button>
            </form>
        </div>
    );
};

export default AddUserForm;
