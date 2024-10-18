const constants = require("../src/utils/constants");
const userRole = constants.ROLE;

module.exports = {
  user: {
    role: {
      'admin': userRole.ADMIN,
      'member': userRole.MEMBER
    },
    roleEnum: [userRole.ADMIN, userRole.MEMBER],
    roleName: {
      [userRole.ADMIN]: 'admin',
      [userRole.MEMBER]: 'member'
    }
  },
  team: {
    permissions: {
      invite: [userRole.ADMIN],
      removeUser: [userRole.ADMIN],
      update: [userRole.ADMIN],
      changeRole: [userRole.ADMIN]
    }
  }
};
