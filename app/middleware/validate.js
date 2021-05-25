const { check, validationResult } = require('express-validator');

function signupValid(req, res, next) {
    check('username')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters'),
    check('email')
        .isEmail()
        .withMessage('Username must be valid'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')

    next()
}

module.exports = signupValid;