const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateRequest } = require('./actions-middlware');

router.get('/', async (req, res, next) => {
    await Actions.get()
        .then(actions => {
            actions
            ? res.status(200).json(actions)
            : res.status(404).json({ message: "No Actions Found" })
        })
        .catch(err => next(err))
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    await Actions.get(id)
        .then(action => {
            action
            ? res.status(200).json(action)
            : res.status(404).json({ message: `No Action Found With ID ${id}` })
        })
        .catch(err => next(err))
});

router.post('/', validateRequest, async (req, res, next) => {
    const newPost = req.body;
    await Actions.insert(newPost)
        .then(newAction => {
            newAction
            ? res.status(201).json(newAction)
            : next()
        })
        .catch(err => next(err))
});

router.put('/:id', validateRequest, async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    await Actions.update(id, changes)
        .then(updatedActions => {
            updatedActions
            ? res.status(200).json(updatedActions)
            : next()
        })
        .catch(err => next(err))
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    await Actions.remove(id)
        .then(delAct => {
            delAct
            ? res.status(200).json(delAct)
            : res.status(404).json({ message: `Action with ID ${id} not found` })
        })
        .catch(err => next(err))
});

module.exports = router;
