const express = require('express');
const { getClient } = require("../AWS/aws");
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config()

// Helper function
function getPathFromURL(urlString) {
    try {
        const url = new URL(urlString);
        return url.pathname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}


router.get(getPathFromURL('http://localhost:8080/'), async (req, res) => {
    const client = getClient()
    try {
        const params = client.callbackParams(req);
        console.log(params)
        const tokenSet = await client.callback(
            'http://localhost:8080/', 
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

module.exports = router;
