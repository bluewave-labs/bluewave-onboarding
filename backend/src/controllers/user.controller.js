const settings = require("../../config/settings");
const UserService = require("../service/user.service");

const userService = new UserService();

const getUsersList = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const { rows: users, count: totalUsers } = await userService.getUsers({page, limit, search})

    let returnObj = {
      users: users.map(user => ({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: settings.user.roleName[user.role]
      })),
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
  try {
    const user = await userService.getUser(userId);
    if (user){
      const { id, name, surname, email, role } = user;
      return res.status(200).json({ user: { id, name, surname, email, role: settings.user.roleName[role] } });
    }
    else{
      return res.status(400).json({ error: "User not found" });
    }
  }
  catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.user.id;
  const inputs = req.body;
  try {
    const user = await userService.updateUser(userId, inputs);

    return res.status(200).json({ message: "User updated successfully" });
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
