module.exports = {
    validateRequest
}

function validateRequest(req, res, next) {
    const method = req.method;
    if (method === "POST") {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({ message: "missing required field" })
        }
        next();
    }else if (method === "PUT") {
        if (!req.body.name || !req.body.description || !req.body.completed) {
            res.status(400).json({ message: "missing required field" })
        }
        next();
    }
}
