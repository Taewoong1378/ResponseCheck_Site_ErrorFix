const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {    // GET /user
    try {
        const users = await User.findAll({
            attributes: ['nickname', 'score'],
            offset: 0,
            limit: 10,
            order: [['score', 'ASC']],
        });
        return res.status(201).json(users);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;