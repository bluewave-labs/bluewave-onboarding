import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import authRoutes from './src/routes/auth.routes';
import popupRoutes from './src/routes/popups.routes';
// import tokenRoutes from './src/routes/token.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/popups', popupRoutes);
app.use('/api/tokens', tokenRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
