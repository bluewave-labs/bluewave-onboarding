const accessGuard = (permissions) => {
  return (req, res, next) => {
    if(!req.user || !req.user.role || !permissions.includes(req.user.role)) {
        return res.status(403).json({ error: "User does not have required access level"});
    }
    next();
  }
};

module.exports = accessGuard;
