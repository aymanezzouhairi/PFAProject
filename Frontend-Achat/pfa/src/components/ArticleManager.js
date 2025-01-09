import React, { useState, useEffect } from 'react';
import './ArticleManager.css'; // Assurez-vous que ce fichier CSS existe

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedTypeName, setSelectedTypeName] = useState('');
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    typeArticleName: ''
  });
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [newType, setNewType] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/articles/all')
      .then(response => response.json())
      .then(data => {
        console.log('Articles reçus:', data);
        setArticles(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des articles:', error));

    fetch('http://localhost:8080/api/articles/types')
      .then(response => response.json())
      .then(data => {
        console.log('Types reçus:', data);
        setTypes(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des types d\'articles:', error));
  }, []);

  const handleTypeChange = (event) => {
    setSelectedTypeName(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleEditClick = (article) => {
    setForm({
      nom: article.nom,
      description: article.description,
      prix: article.prix,
      typeArticleName: article.typeArticle?.nom || ''
    });
    setEditingArticleId(article.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Trouver l'ID du type d'article en fonction du nom sélectionné
    const selectedType = types.find(type => type.nom === form.typeArticleName);
  
    const url = editingArticleId
      ? `http://localhost:8080/api/articles/${editingArticleId}`
      : 'http://localhost:8080/api/articles/add';
  
    fetch(url, {
      method: editingArticleId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form,
        typeArticle: { id: selectedType?.id } // Envoie l'ID du type d'article
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Article enregistré:', data);
        setArticles(prevArticles => {
          if (editingArticleId) {
            return prevArticles.map(article =>
              article.id === editingArticleId ? data : article
            );
          } else {
            return [...prevArticles, data];
          }
        });
        setForm({
          nom: '',
          description: '',
          prix: '',
          typeArticleName: ''
        });
        setEditingArticleId(null);
      })
      .catch(error => console.error('Erreur lors de l\'ajout ou de la mise à jour:', error));
  };
  

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/articles/delete/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
        } else {
          console.error('Erreur lors de la suppression de l\'article.');
        }
      })
      .catch(error => console.error('Erreur lors de la suppression:', error));
  };

  const filteredArticles = articles.filter(article => {
    if (!selectedTypeName) {
      return true;
    }
    console.log("Article a verifier:",article)
    return article.typeArticle?.nom === selectedTypeName;
  });

  const handleAddType = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/api/typesArticle/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom: newType })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Type d\'article ajouté:', data);
        setTypes(prevTypes => [...prevTypes, data]);
        setNewType('');
      })
      .catch(error => console.error('Erreur lors de l\'ajout du type d\'article:', error));
  };

  return (
    <div className="article-container">
      <h2 className="page-title">Articles Page</h2>

      <div className="form-container">
        <h3>{editingArticleId ? 'Modifier l\'Article' : 'Ajouter un Article'}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Prix</label>
            <input
              type="number"
              name="prix"
              value={form.prix}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Type d'article</label>
            <select
              name="typeArticleName"
              value={form.typeArticleName}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez un type</option>
              {types.map(type => (
                <option key={type.id} value={type.nom}>
                  {type.nom}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">{editingArticleId ? 'Mettre à jour' : 'Ajouter'}</button>
        </form>
      </div>

      <div className="filter-container">
        <select onChange={handleTypeChange} value={selectedTypeName} className="type-select">
          <option value="">Sélectionnez un type</option>
          {types.map(type => (
            <option key={type.id} value={type.nom}>
              {type.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="add-type-container">
        <h3>Ajouter un Type d'Article</h3>
        <form onSubmit={handleAddType}>
          <div>
            <label>Nom du Type</label>
            <input
              type="text"
              value={newType}
              onChange={e => setNewType(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ajouter Type</button>
        </form>
      </div>

      <div className="articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="article-card">
              <h3 className="article-title">{article.nom}</h3>
              <p className="article-description">{article.description}</p>
              <p className="article-price">Prix: {article.prix} DHs</p>
              <p className="article-type">Type Article ID: {article.typeArticle?.id}</p> {/* Affichage du type_article_id */}
              <button className="edit-button" onClick={() => handleEditClick(article)}>Modifier</button>
              <button className="delete-button" onClick={() => handleDelete(article.id)}>Supprimer</button>
            </div>
          ))
        ) : (
          <p className="no-articles">Aucun article trouvé pour ce type.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleManager;
