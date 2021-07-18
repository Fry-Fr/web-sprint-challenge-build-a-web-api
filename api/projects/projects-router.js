const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

router.get('/', async (req, res, next) => {
    await Projects.get()
        .then(projects => {
            projects
            ? res.status(200).json(projects)
            : res.status(404).json({ message: "No Projects Found" })
        })
        .catch(err => next(err))
});

module.exports = router;
