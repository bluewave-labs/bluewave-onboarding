const { User } = require('../models/User');

const userList = async (req, res)=>{
    const users = await User.findAll();
    res.status(200).json(users);
}

module.exports = {
    userList
}

