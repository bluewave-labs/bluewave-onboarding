const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const jsonErrorMiddleware = require("./src/middleware/jsonError.middleware");

// Load environment variables from .env file
dotenv.config();

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const mocks = require('./src/routes/mocks.routes');
const popup = require('./src/routes/popup.routes');
const popup_log = require('./src/routes/popuplog.routes');
const banner = require('./src/routes/banner.routes');
const teamRoutes = require('./src/routes/team.routes');
const hint = require('./src/routes/hint.routes');
const tourRoutes = require('./src/routes/tour.routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(jsonErrorMiddleware);

const { sequelize } = require("./src/models");

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

sequelize
  .sync({ force: true })
  .then(() => console.log("Models synced with the database..."))
  .catch((err) => console.log("Error syncing models: " + err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mock/', mocks);
app.use('/api/popup', popup);
app.use('/api/popup_log', popup_log);
app.use('/api/banner', banner);
app.use('/api/team', teamRoutes);
// app.use('/api/tours', tourRoutes);
app.use('/api/hint', hint);
app.use('/api/tour', tourRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
