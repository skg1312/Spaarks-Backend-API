const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  // Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));