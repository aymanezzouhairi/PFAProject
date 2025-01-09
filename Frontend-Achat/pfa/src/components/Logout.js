// src/Logout.js
// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Fonction de déconnexion (par exemple, supprimer le token JWT)
        const logout = () => {
            // Effacer les informations d'authentification (localStorage, cookies, etc.)
            localStorage.removeItem('userRole'); // Exemple de suppression d'une information
            // Vous pouvez également effacer d'autres données liées à la session ici
        };

        logout();
        // Rediriger vers la page de connexion après la déconnexion
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <p>Déconnexion en cours...</p>
        </div>
    );
};

export default Logout;

