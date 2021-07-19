const express = require('express');
const server = express();
const helmet = require('helmet');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req,res) => {
    res.send(`
        <h1>Hello form the sprint-challenge express api 🤖</h1>
    `)
});

module.exports = server;
