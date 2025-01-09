// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import RequestForm from './components/RequestForm';
import ArticleManager from './components/ArticleManager';
import AddUserForm from './components/AddUserForm';
import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import DemandeList from './components/DemandeList';

const App = () => {
    const [userRole, setUserRole] = useState(null);

    const handleLogin = (username, password) => {
        if (username === 'admin') {
            setUserRole('admin');
        } else {
            setUserRole('demandeur');
        }
    };

    const handleLogout = () => {
        setUserRole(null); // Réinitialiser l'état de l'utilisateur
    };

    return (
        <Router>
            <div>
                {!userRole ? (
                    <Routes>
                        <Route path="/" element={<Login onLogin={handleLogin} />} />
                    </Routes>
                ) : (
                    <>
                        {userRole === 'admin' ? (
                            <AdminNavbar onLogout={handleLogout} />
                        ) : (
                            <UserNavbar onLogout={handleLogout} />
                        )}
                        <Routes>
                            {userRole === 'admin' ? (
                                <>
                                    <Route path="/dashboard" element={<AdminDashboard />} />
                                    <Route path="/articles" element={<ArticleManager />} />
                                    <Route path="/addUser" element={<AddUserForm />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/request" element={<RequestForm />} />
                                    <Route path='/ListDemande' element={<DemandeList />} />
                                </>
                            )}
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
};

export default App;
