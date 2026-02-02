const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Sample route
app.get('/', (req, res) => {
    res.send('Hello Vishal!');
});