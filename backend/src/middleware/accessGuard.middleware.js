const accessGuard = (permissions) => {
  return (req, res, next) => {
    if(!permissions.includes(req.user.role)) {
        return res.status(403).json({ error: "User not have required access level"});
    }
    next();
  }
};

module.exports = accessGuard;
