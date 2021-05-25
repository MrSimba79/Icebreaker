const { Router } = require('express');
const db = require('../database/database');

const router = Router();

router.get('/', (req, res) => {
    res.send(200);
});

router.get('/postTitle/:title', (req, res) => {
    res.json({ title: 'Some random post' })
});

router.post('/newPost', (req, res) => {
    const { caption, type } = req.body;
    if (caption && type) {
        try {
            db.promise().query(`INSERT INTO POSTS (caption, type) VALUES('${caption}', '${type}')`);
            res.status(201).send({ msg: 'Created post' });
        }
        catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;