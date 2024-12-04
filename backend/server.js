const express = require('express');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv'); 
const ejs = require('ejs'); // AWS
const { initializeClient, getClient } = require('./src/AWS/aws'); // AWS
const { checkAuth } = require('./src/middleware/auth'); // AWS
const authRoutes = require('./src/routes/authRoute'); // AWS
const { generators } = require('openid-client'); // AWS
const { getLobby, joinLobby, lobbies } = require('./src/lobbies/lobbies');
const { connection } = require('./src/db/connection');

dotenv.config();

// Initialize OpenID Client
initializeClient()
    .then(() => console.log('OpenID Client Initialized'))
    .catch(console.error);

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Set View Engine to EJS
app.set('view engine', 'ejs');


// Auth Route
app.use(authRoutes);

// Home Route. ToDo: Change this around with creds and stuff
app.get('/', checkAuth, (req, res) => {
    res.redirect('http://localhost:5173/home');
    // res.render('/home', {
    //     isAuthenticated: req.isAuthenticated,
    //     userInfo: req.session.userInfo
    // });
});

// Login route
app.get('/login', (req, res) => {
    const client = getClient()
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'email openid phone',
        state: state,
        nonce: nonce,
    });
    
    res.redirect(authUrl)
});

// Callback route
app.get('/callback', async (req, res) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
            'http://localhost:8080/callback',
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state
            }
        );

        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo;

        res.redirect('/');
    } catch (err) {
        console.error('Callback error:', err);
        res.redirect('/');
    }
});

// ToDo: Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.redirect('/');
    });
});

// Lobby routes
app.get('/get-lobby/', checkAuth, (req, res) => {
    const lobby = getLobby();
    res.json(lobby);
});

app.post('/join-lobby/', checkAuth, (req, res) => {
    joinLobby(req.body.id, req.body.player);
    res.json('Added player to lobby');
});

// Catch-all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start Server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
