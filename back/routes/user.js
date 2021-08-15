const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {    // POST /user
    try {
        await User.create({
            nickname: req.body.nickname,
            score: req.body.score,
        });

        const user = await User.findOne({
            where: { nickname: req.body.nickname },
        });
        return res.status(201).json(user);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// router.post('/', async (req, res, next) => {    // POST /user
//     try {
//         await User.create({
//             nickname: req.body.nickname,
//             score: req.body.score,
//         });

//         const where = {};
//         if (parseInt(req.query.lastScore, 10)) { // 초기 로딩이 아닐 때
//             where.score = { [Op.lt]: parseInt(req.query.lastScore, 10)}
//         }
//         const results = await User.findAll({
//             where,
//             attributes: ['nickname', 'score'],
//             limit: 10,
//             order: [['score', 'ASC']],
//         });
//         return res.status(201).json(results);
//     } catch(error) {
//         console.error(error);
//         next(error);
//     }
// });

module.exports = router;