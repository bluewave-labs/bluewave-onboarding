const { Sequelize } = require("sequelize");
const config = require("../../config/config.js");

const env = process.env.NODE_ENV || "development";
const envConfig = config[env];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    dialect: envConfig.dialect,
    port: envConfig.port,
    logging: envConfig.logging,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./User.js")(sequelize, Sequelize.DataTypes);
db.Popup = require("./Popup.js")(sequelize, Sequelize.DataTypes);
db.Token = require("./Token.js")(sequelize, Sequelize.DataTypes);
db.PopupLog = require("./PopupLog.js")(sequelize, Sequelize.DataTypes);
db.Banner = require("./Banner.js")(sequelize, Sequelize.DataTypes);
db.Team = require("./Team.js")(sequelize, Sequelize.DataTypes);
db.Invite = require("./Invite.js")(sequelize, Sequelize.DataTypes);
db.UserTeams = require("./UserTeams.js")(sequelize, Sequelize.DataTypes);

// Define associations here
db.User.hasMany(db.Popup, { foreignKey: "createdBy", as: "popups" });
db.Popup.belongsTo(db.User, { foreignKey: "createdBy", as: "creator" });

db.User.hasMany(db.Banner, { foreignKey: "createdBy", as: "banners" });
db.Banner.belongsTo(db.User, { foreignKey: "createdBy", as: "creator" });

db.User.belongsToMany(db.Team, { through: db.UserTeams, foreignKey: "userId" });
db.Team.belongsToMany(db.User, { through: db.UserTeams, foreignKey: "teamId" });

db.Team.belongsTo(db.User, { foreignKey: "createdBy", as: "creator" });

db.Invite.belongsTo(db.User, { foreignKey: "invitedBy" });
db.User.hasMany(db.Invite, { foreignKey: "invitedBy" });

db.Invite.belongsTo(db.Team, { foreignKey: "teamId", as: "team" });


module.exports = db;
