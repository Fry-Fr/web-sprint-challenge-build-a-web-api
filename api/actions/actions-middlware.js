module.exports = {
    validateRequest
}

function validateRequest (req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "missing required field" })
    }
    next();
}
