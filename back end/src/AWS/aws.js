const { Issuer } = require('openid-client');
const dotenv = require('dotenv');

dotenv.config();

let client;

async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-2.amazonaws.com/us-east-2_Y6bFze6G2');
    client = new issuer.Client({
        client_id: process.env.COGNITO_APP_CLIENT_ID,
        client_secret: process.env.COGNITO_APP_CLIENT_SECRET,
        redirect_uris: ['http://localhost:8080/callback'], 
        response_types: ['code'],
    });
    console.log('OpenID Client Initialized');
}

function getClient() {
    if (!client) {
        throw new Error('OpenID client not initialized. Call initializeClient() first.');
    }
    return client;
}

module.exports = {
    initializeClient,
    getClient,
};
