const validateWTCEmail = (req, res, next) => {
    const {email} = req.body;
    if (!email.endsWith('@student.wethinkcode.co.za')) {
        return res.status(403).json({message: 'Access denied. WeThinkCode_ emails only.'});
    }
    next();
};