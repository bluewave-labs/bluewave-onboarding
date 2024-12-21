const constants = require("../src/utils/constants.helper");
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
      changeRole: [userRole.ADMIN],
      setOrg: [userRole.ADMIN],
      serverUrl: [userRole.ADMIN],
      popups: [userRole.ADMIN],
      hints: [userRole.ADMIN],
      banners: [userRole.ADMIN],
      links: [userRole.ADMIN],
      tours: [userRole.ADMIN],
      helpers: [userRole.ADMIN],
    }
  }
};
