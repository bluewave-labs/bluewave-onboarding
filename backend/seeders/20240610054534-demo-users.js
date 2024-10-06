"use strict";
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "demoUser1",
          email: "demo1@example.com",
          password: hashedPassword,
          role: "user",
          createdAt: new Date(),
        },
        {
          name: "demoUser2",
          email: "demo2@example.com",
          password: hashedPassword,
          role: "user",
          createdAt: new Date(),
        },
        {
          name: "demoUser3",
          email: "demo3@example.com",
          password: hashedPassword,
          role: "user",
          createdAt: new Date(),
        },
        {
          name: "demoname4",
          email: "demo4@example.com",
          password: hashedPassword,
          role: "name",
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("names", null, {});
  },
};
