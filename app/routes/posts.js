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
    // const { title, image_url, description } = req.body;

    const title = req.body.title;
    const image_url = req.body.image_url;
    // const description = req.body.description;


    if (title && image_url) {
        try {
            db.promise().query(`INSERT INTO Posts (title, image_url) VALUES ('${title}', '${image_url}')`);
            res.status(201).send({ msg: 'Created post' });
        }
        catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;