// src/components/UserNavbar.js
import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Navbar.css'; // Assurez-vous de créer un fichier CSS pour le style
import  Logo from '../image/logo-riva.png'
import faireDemande from '../image/faireLaDemande.png'
import decision from '../image/decision.png'
import Logout from '../image/en-dehors.png'
const UserNavbar = ({onLogout}) => {
    const navigate = useNavigate(); // Initialisation de useNavigate

    const handleLogout = () => {
        onLogout(); // Appel de la fonction onLogout pour mettre à jour l'état
        navigate('/'); // Redirection vers la page de connexion
    };

    return (
        <nav className="navbar">
            <ul>
                 <li><img src={Logo} alt='Logo' className="logo"/></li>
                <li><Link to="/request"><img src={faireDemande} alt='request'/>Formulaire de Demande</Link></li>
                <li><Link to={"/ListDemande"}><img src={decision} alt='ListDemande'/>Liste Demandes</Link></li>  
                <li><button onClick={handleLogout}><img src={Logout} alt="logout"/>Logout</button></li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
