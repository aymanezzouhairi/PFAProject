// src/components/DemandeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DemandeList.css'; // Importez le fichier CSS

const DemandeList = () => {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/demandes/admin/list');
                setDemandes(response.data);
            } catch (error) {
                setError('Erreur lors du chargement des demandes');
            } finally {
                setLoading(false);
            }
        };

        fetchDemandes();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="demande-list-container">
            <h1>Liste des Demandes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                       
                        <th>Description</th>
                        <th>Montant</th>
                        <th>Type d'Article</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {demandes.map((demande) => (
                        <tr key={demande.id}>
                            <td>{demande.id}</td>
                          
                            <td>{demande.description}</td>
                            <td>{demande.montant}</td>
                            <td>{demande.typeArticle ? demande.typeArticle.nom : 'N/A'}</td>
                            <td>{demande.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DemandeList;
