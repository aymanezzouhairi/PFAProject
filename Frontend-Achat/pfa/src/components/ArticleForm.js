import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleForm = ({ article, onClose, onSave }) => {
    const [nom, setNom] = useState(article.nom || '');
    const [description, setDescription] = useState(article.description || '');
    const [prix, setPrix] = useState(article.prix || '');
    const [typeArticles, setTypeArticles] = useState([]);
    const [typeArticle, setTypeArticle] = useState(article.typeArticle.id || '');

    useEffect(() => {
        const fetchTypeArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/articles/types');
                console.log('Fetched type articles:', response.data);
                if (Array.isArray(response.data)) {
                    setTypeArticles(response.data);
                } else {
                    console.error('Fetched data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching type articles', error);
            }
        };

        fetchTypeArticles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { nom, description, prix, typeArticle: { id: typeArticle } };
        try {
            if (article.id) {
                // Update existing article
                await axios.put(`http://localhost:8080/api/articles/update/${article.id}`, payload);
            } else {
                // Create new article
                await axios.post('http://localhost:8080/api/articles/add', payload);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error('Error saving article', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nom:</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <label>Prix:</label>
            <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
        
         
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default ArticleForm;
