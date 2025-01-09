import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import Logo from '../image/logo-riva.png';
import articleicone from "../image/articles.png";
import demandeicone from "../image/demande.png";
import logout from "../image/en-dehors.png"
import user from "../image/useradd.png"



const AdminNavbar = ({ onLogout }) => {
    const navigate = useNavigate(); // Initialisation de useNavigate

    const handleLogout = () => {
        onLogout(); // Appel de la fonction onLogout pour mettre à jour l'état
        navigate('/'); // Redirection vers la page de connexion
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><img src={Logo} alt='Logo' className="logo" /></li>
                <li><Link to="/dashboard"><img src={demandeicone} alt="demande"/>Demandes</Link></li>
                <li><Link to="/articles"><img src={articleicone} alt="article"/>Articles</Link></li>
                <li><Link to="/addUser"><img src={user} alt='adduser'/>Ajouter User</Link></li>
                <li><button onClick={handleLogout}><img src={logout} alt="logout"/>Logout</button></li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;

