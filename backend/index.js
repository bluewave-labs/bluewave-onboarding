const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const mocks = require('./src/routes/mocks.routes');
// const tourRoutes = require('./src/routes/tour.routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/mock/', mocks);
// app.use('/tours', tourRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
