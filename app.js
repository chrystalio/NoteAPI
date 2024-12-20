const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db')
const notesRoutes = require('./routes/notesRoutes');

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const welcomeMessage = {
    status: 'success',
    message: 'API is up and running! 🚀 Welcome To NoteAPI',
    timestamp: new Date().toISOString()
};

app.get('/', (req, res) => {
    res.status(200).json(welcomeMessage);
});

app.use('/api/v1/notes', notesRoutes);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.APP_PORT || 3000;

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        process.exit(1);
    } else {
        console.log('Connected to MySQL database');

        app.listen(PORT, HOST, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    }
});