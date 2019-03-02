const fs = require('fs');
const { Router } = require('express');
const rootDir = require('app-root-dir');
const db = require('../db');

const router = Router();

router.get('/', (req, res) => {
    res.send('ok');
});

router.post('/local', (req, res) => {
    db = JSON.parse(req.body.payload);
    res.sendStatus(200)
});

router.post('/remote', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;