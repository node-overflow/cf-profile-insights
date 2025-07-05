const express = require('express');
const cfRoutes = require('./routes/cf_routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/api/cf', cfRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
