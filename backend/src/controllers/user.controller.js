const UserService = require("../service/user.service");

const userService = new UserService();

const getUsersList = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const offset = (page - 1) * limit;

    const { rows: users, count: totalUsers } = await userService.getUsers({page, limit, search})

    let returnObj = {
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      totalUsers,
    };

    res.status(200).json(returnObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const user = await userService.getUserById(userId);
  if (user){
    const { name, surname, email, role } = user;
    return res.status(200).json({ user: { name, surname, email, role } });
  }
  else{
    return res.status(400).json({ error: "User not found" });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.user.id;
  const inputs = req.body;
  try {
    const user = await userService.getUserById(userId);
    if(!user) {
      return res.status(400).json({ error: "User not found" });
    }
    await user.update({
      ...(inputs.name && { name: inputs.name }),
      ...(inputs.surname && { surname: inputs.surname }),
      ...(inputs.email && { email: inputs.email }),
    })

    const updatedUser = await userService.getUserById(userId);
    const { name, surname, email, role } = updatedUser;

    return res.status(200).json({ user: { name, surname, email, role} });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await userService.deleteUser(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUsersList, getCurrentUser, updateUserDetails, deleteUser };
