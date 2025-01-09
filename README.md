## Description du Projet

Ce projet permet de gérer les demandes d'achat au sein d'une organisation. Les demandeurs peuvent soumettre des demandes pour différents types d'articles (PC, imprimantes, accessoires informatiques), tandis que les administrateurs peuvent gérer ces demandes (acceptation ou refus) et envoyer des notifications par email aux demandeurs.

## Fonctionnalités

- **Gestion des Demandeurs** : Création, mise à jour, et suppression des demandeurs.
- **Soumission de Demandes d'Achat** : Les demandeurs peuvent soumettre des demandes pour divers types d'articles.
- **Gestion des Articles** : Les administrateurs peuvent ajouter, mettre à jour, et supprimer des articles.
- **Filtrage des Articles** : Les administrateurs peuvent filtrer les articles par type.
- **Gestion des Demandes d'Achat** : Les administrateurs peuvent accepter ou refuser les demandes d'achat et notifier les demandeurs par email.

## Prérequis

- JDK 11 ou version ultérieure
- Node.js (version LTS recommandée)
- Maven (pour le build du projet Spring Boot)
- MySQL (ou une autre base de données SQL compatible)

## Installation

### Backend (Spring Boot)

1. Clonez le dépôt :

    ```bash
    git clone "https://github.com/aymanezzouhairi/Projet"
    ```

2. Accédez au répertoire du backend :

    ```bash
    cd projet/achat
    ```

3. Configurez les paramètres de la base de données dans le fichier `src/main/resources/application.properties` :

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/"Nom de la base de donnée" 
    spring.datasource.username=root
    spring.datasource.password=Votre Mot de passe
    ```

4. Compilez et exécutez le backend :

    ```bash
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

### Frontend (React.js)

1. Accédez au répertoire du frontend :

    ```bash
    cd ../frontend-Achat/pfa
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```
    npm install axios
   ```
   npm install react-router-dom

4. Exécutez l'application frontend :

    ```bash
    npm start
    ```
    ---

Merci d'utiliser notre application de gestion des demandes d'achat !
