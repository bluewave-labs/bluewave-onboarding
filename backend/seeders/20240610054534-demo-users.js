"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "demoUser1",
          email: "demo1@example.com",
          password: "password123",
          role: "user",
          createdAt: new Date(),
        },
        {
          username: "demoUser2",
          email: "demo2@example.com",
          password: "password123",
          role: "user",
          createdAt: new Date(),
        },
        {
          username: "demoUser3",
          email: "demo3@example.com",
          password: "password123",
          role: "user",
          createdAt: new Date(),
        },
        {
          username: "demoUser4",
          email: "demo4@example.com",
          password: "password123",
          role: "user",
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
