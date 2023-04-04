const express = require('express')
const routers = express.Router()

routers.post('/setcookie', (req, res) => {
    res.cookie("accept","value",{
        maxAge: 86400000,
        expires: new Date('01 12 2023'),
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    });
    res.send('Cookie sauvegardé');
});
routers.get('/getcookie', (req, res) => {
    res.send(req.cookies.accept);
});
routers.get('/deletecookie', (req, res) => {
    res.clearCookie()
    res.send('Cookie supprimé');
});


module.exports = routers