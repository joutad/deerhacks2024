const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

//Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

//Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

//Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server: port ${PORT}`);
});
