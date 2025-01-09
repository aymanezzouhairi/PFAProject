import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDemandes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/demandes/admin/list');
                setDemandes(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des demandes', err);
                setErrorMessage('Erreur lors de la récupération des demandes');
            } finally {
                setLoading(false);
            }
        };

        fetchDemandes();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/demandes/manager/update/demande/status/${id}`,
                { status: newStatus }, // Envoi du nouveau statut
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                alert('Statut mis à jour et email envoyé avec succès');
                // Mettre à jour la liste des demandes après modification
                setDemandes(demandes.map(demande => 
                    demande.id === id ? { ...demande, status: newStatus } : demande
                ));
            } else {
                alert('Erreur lors de la mise à jour du statut');
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour du statut', err);
            alert('Erreur lors de la mise à jour du statut');
        }
    };

    const handleDeleteRequest = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/demandes/admin/delete/${id}`);
            if (response.status === 200) {
                alert('Demande supprimée avec succès');
                setDemandes(demandes.filter(demande => demande.id !== id));
            }
        } catch (err) {
            console.error('Erreur lors de la suppression de la demande', err);
            setErrorMessage('Erreur lors de la suppression de la demande');
        }
    };

    return (
        <div className="admin-dashboard-container">
            <h2>Tableau de bord Admin</h2>
            {loading ? <p>Chargement...</p> : (
                <>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Email</th> {/* Ajout de l'email */}
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.map(demande => (
                                <tr key={demande.id}>
                                    <td>{demande.id}</td>
                                    <td>{demande.description}</td>
                                    <td>{demande.montant}</td>
                                    <td>{demande.email}</td> {/* Affichage de l'email */}
                                    <td>
                                        <select 
                                            value={demande.status}
                                            onChange={(e) => handleUpdateStatus(demande.id, e.target.value)}
                                        >
                                            <option value="En_cours_de_traitement">En cours de traitement</option>
                                            <option value="Accepter">Accepter</option>
                                            <option value="Refuser">Refuser</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteRequest(demande.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
