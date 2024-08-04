// Charger les variables d'environnement
require('dotenv').config();

// Inclure Axios
const axios = require('axios');

// ID client de NationsGlory
const clientId = 'CLIENTID_cZbq7IK6jJdMci7xDty7cwxG8zvk3rpN5d066e89b4316ad09f66704e5edec6d5';
const redirectUri = 'https://lepionnier92.github.io/NationsgloryStorage/';

// Configurer le lien d'authentification
const authLink = document.getElementById('auth-link');
authLink.href = `https://publicapi.nationsglory.fr/oauth/auth?client_id=CLIENTID_cZbq7IK6jJdMci7xDty7cwxG8zvk3rpN5d066e89b4316ad09f66704e5edec6d5&redirect_uri=https://lepionnier92.github.io/NationsgloryStorage/`;

// Fonction pour extraire les paramètres de l'URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

// Fonction pour afficher les données sur la page web
function displayData(data) {
    const dataDiv = document.getElementById('data');
    dataDiv.innerHTML = JSON.stringify(data, null, 2);
}

// Fonction pour récupérer et vérifier le token d'accès
function fetchData(accessToken) {
    const clientSecret = process.env.CLIENT_SECRET; // Assurez-vous que le client_secret est défini dans le fichier .env
    const options = {
        method: 'GET',
        url: 'https://publicapi.nationsglory.fr/oauth/checkToken',
        params: {
            access_token: accessToken,
            client_secret: clientSecret
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    };

    axios.request(options)
        .then(function (response) {
            displayData(response.data);
        })
        .catch(function (error) {
            console.error('Erreur lors de la récupération des données:', error);
        });
}

// Extraire le token d'accès de l'URL et faire la requête si le token est présent
document.addEventListener('DOMContentLoaded', function() {
    const queryParams = getQueryParams();
    if (queryParams.token_access) {
        fetchData(queryParams.token_access);
    }
});
