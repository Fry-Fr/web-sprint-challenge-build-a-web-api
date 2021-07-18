const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateRequest } = require('./projects-middleware');

router.get('/', async (req, res, next) => {
    await Projects.get()
        .then(projects => {
            projects
            ? res.status(200).json(projects)
            : res.status(404).json({ message: "No Projects Found" })
        })
        .catch(err => next(err))
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    await Projects.get(id)
        .then(project => {
            project
            ? res.status(200).json(project)
            : res.status(404).json({ message: `No Project Found With ID ${id}` })
        })
        .catch(err => next(err))
});

router.post('/', validateRequest, async (req, res, next) => {
    const newPost = req.body;
    await Projects.insert(newPost)
        .then(newProject => {
            newProject
            ? res.status(201).json(newProject)
            : next()
        })
        .catch(err => next(err))
});

router.put('/:id', validateRequest, async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    await Projects.update(id, changes)
        .then(updatedProj => {
            updatedProj
            ? res.status(200).json(updatedProj)
            : next();
        })
        .catch(err => next(err))
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    await Projects.remove(id)
        .then(delProj => {
            delProj
            ? res.status(200).json(delProj)
            : res.status(404).json({ message: `Project with ID ${id} not found` })
        })
        .catch(err => next(err))
});

module.exports = router;
