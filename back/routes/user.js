const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {    // POST /user
    try {
        await User.create({
            nickname: req.body.nickname,
            score: req.body.score,
        });
        const results = await User.findAll({
            where,
            attributes: ['nickname', 'score'],
            limit: 10,
            order: [['score', 'ASC']],
        });
        return res.status(201).json(results);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;