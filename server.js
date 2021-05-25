require('dotenv').config();
const express = require('express');
const session = require('express-session');

const usersRoute = require('./app/routes/users');
const postsRoute = require('./app/routes/posts');

const port = process.env.PORT;
const app = express();

app.use('/users', usersRoute);
app.use('/posts', postsRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});






// app.use((req, res, next) => {
//     console.log(store)
//     console.log(`${req.method} - ${req.url}`);
//     next();
// })


// const users = [
//     {name: 'Rodrigo', age:23},
//     {name: 'Tomas', age:20},
//     {name: 'Ana', age:50},
// ]

// const posts = [
//     {title: 'My favourite foods'},
//     {title: 'My favourite games'}
// ]
// app.get('/', (req, res) => {
//     res.sendStatus(200)
// });

// app.get('/users', (req, res) => {
//     res.status(200).send(users)
// });

// app.get('/users/:name', (req, res) => {
//     const { name } = req.params;
//     const user = users.find((user) => user.name === name);
//     if (user) {
//         res.status(200).send(user);
//     } else {
//         res.status(404).send('Not found');
//     }
// });

// app.get('/posts', (req, res) => {
//     const { title } = req.query;
//     if (title) {
//         const post = posts.find((post) => post.title === title);
//         if (post) {
//             res.status(200).send(post)
//         } else {
//             res.status(404).send('Not found');
//         }
//     }
//     res.status(200).send(posts);
// });

// function validateCookie(req, res, next) {
//     const { cookies } = req;
//     if ('session_id' in cookies) {
//         if (cookies.session_id === '12345') {
//             next();
//         } else {
//             res.status(403).send({ msg: 'Not Authenticated' });
//         }
//     } else {
//         res.status(403).send({ msg: 'Not Authenticated' });

//     }
// }

// app.get('/signin', (req, res) => {
//     res.cookie('session_id', '12345');
//     res.status(200).json({ msg: 'logged in' });
// });

// app.get('/protected', validateCookie, (rez, res) => {
//     res.status(200).json({ msg: 'You are authorized '});
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     if(username && password) {
//         if (req.session.authenticated) {
//             res.json(req.session);
//         } else {
//             if (password === '123') {
//                 req.session.authenticated = true;
//                 req.session.user = { username, password };
//                 res.json(req.session);
//             } else {
//                 res.status(403).json({ msg: 'Bad Credentials' });
//             }
//         }
//     } else {
//         res.status(403).json({ msg: 'Bad Credentials' });
//     }
// })