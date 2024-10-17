const { MAX_FILE_SIZE } = require('../utils/constants');

const fileSizeValidator = (req, res, next) => {
    const contentLength = req.headers['content-length'];
    if (contentLength && contentLength > MAX_FILE_SIZE) {
        return res.status(413).send('File size exceeds the limit');
    }
    next();
};

module.exports = fileSizeValidator;