const express = require('express')
const routers = express.Router()

routers.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge: 5000,
        expires: new Date('01 12 2023'),
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});
routers.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
});
routers.get('/deletecookie', (req, res) => {
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});


module.exports = routers