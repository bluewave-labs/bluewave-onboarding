"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = "$2b$10$tQiyc0NpG9UFoH6k6j6IbuPcZNFZFUkFMC28r9752WLqlDB.sIzC." //password123
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
          name: "demoUser4",
          email: "demo4@example.com",
          password: hashedPassword,
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
