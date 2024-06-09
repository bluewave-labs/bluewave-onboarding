const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
//const sequelize = require('sequelize');

// Load environment variables from .env file
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}`, debug: true });

const authRoutes = require('./src/routes/auth.routes');
const mocks = require('./src/routes/mocks.routes');
const sequelize = require('./sequelize/models');

// const tourRoutes = require('./src/routes/tour.routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const checkConnection = async () => {
    console.log('DB connection checking...');
    try {
        await sequelize.authenticate();
        console.log('connected');
    } catch (error) {
        console.log('DB connection error', error);
        process.exit(1);
    }
}




app.use('/auth', authRoutes);
app.use('/mock/', mocks);

// app.use('/tours', tourRoutes);
sequelize.sync({force: true});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


(async ()=>{
    await checkConnection();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });    
})();

