function jsonErrorMiddleware(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('JSON Syntax Error:', err);
      return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next();
  }
  
  module.exports = jsonErrorMiddleware;
  