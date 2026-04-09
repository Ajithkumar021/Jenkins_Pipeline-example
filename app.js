
const express = require('express');
const app = express();

//Root route
app.get('/', (req, res) => {
    res.send('Jenkins_Session');
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
