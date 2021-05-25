require('dotenv').config();
const { Router, response } = require('express');
const express = require('express');
const db = require('../database/database');
const { check, validationResult } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const signupValid = require('../middleware/validate');

const router = Router();
const app = express();

const bcrypt = require('bcryptjs');
const salt = 10;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const store = new session.MemoryStore();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: process.env.SECRET,
    cookie: {maxAge: 120000 },
    saveUninitialized: false,
    resave: false,
    store
}));

// router.use((req, res, next) => {
//     console.log('Request made to /USERS ROUTE');
//     next();
// })

router.get('/', async (req, res) => {
    const results = await db.promise().query(`SELECT users.username, users.email, users.real_name, users.gender, users.birthdate, users.createdAt FROM USERS`);
    res.status(200).send(results[0]);
});

// console.log(req.url);

router.get('/:id', async (req, res) => {
    
    const id = req.url.substring(1);

    if (isNaN(id)) {
         return res.status(400).send({ msg: 'id is not integer'});
    }
    const result = await db.promise().query(`
        SELECT
            users.username,
            users.email,
            users.real_name,
            users.gender,
            users.birthdate,
            users.createdAt
        FROM USERS
        WHERE users.user_id = ${id}
        `);
        if (result.length > 0) {
            res.status(200).send(result[0]);  // TODO
        } else {
            res.status(404).send({ msg: 'No profile found' });
        }
});

router.get('/posts', (req, res) => {
    res.json({ route: 'posts' })
});

router.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("Authenticated")
});

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
});


router.post('/signup', signupValid, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query(
            "INSERT INTO Users (username, email, password) VALUES (?,?,?)",
            [username, email, hash],
            (err, result) => {
                console.log(err);
            }
        );
        res.status(201).send({ msg: 'Created user' });
    })
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query(`SELECT * FROM Users WHERE username = ?`,
    username,
    (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (response) {
                    const id = result[0].id;
                    const token = jwt.sign({id}, process.env.SECRETJWT, {
                        expiresIn: 300,
                    })
                    req.session.user = result;
                    res.status(201).json({ auth: true, token: token, result: result, msg: 'Logged in' });
                } else {
                    res.status(403).send({ msg: 'Wrong username and/or password' });
                }
            })
        } else {
            res.status(403).send({ msg: 'User does not exist' });
        };
    });
});


module.exports = router;