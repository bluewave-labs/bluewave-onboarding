const { MAX_FILE_SIZE } = require('../utils/constants');

const fileSizeValidator = (req, res, next) => {
    const contentLength = Number(req.headers['content-length']);
    
    if (isNaN(contentLength)) {
        return res.status(400).json({
            error: 'Missing or invalid Content-Length header'
        });
    }
    
    if (contentLength > MAX_FILE_SIZE) {
        return res.status(413).json({
            error: `File size exceeds the limit of ${MAX_FILE_SIZE} bytes`,
            receivedSize: contentLength
        });
    }
    
    next();
};

module.exports = fileSizeValidator;
