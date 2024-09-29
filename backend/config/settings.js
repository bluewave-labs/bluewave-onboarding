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
  access: {
    invite: [userRole.ADMIN],
    delete: [userRole.ADMIN],
    changeRole: [userRole.ADMIN]
  }
  
};
