const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');

router.get('/', async (req, res, next) => {
    await Actions.get()
        .then(actions => {
            actions
            ? res.status(200).json(actions)
            : res.status(404).json({ message: "No Actions Found" })
        })
        .catch(err => next(err))
});

module.exports = router;
