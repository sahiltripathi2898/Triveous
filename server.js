const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Parse requests
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//Using Promises instead of async await
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database.', err);
    process.exit();
  });

// define a simple route
app.get('/', (req, res) => {
  res.json({
    message:
      'Welcome to Bookmark application , you can test the API using postman or add /api/ at the end of the url to get all bookmark',
  });
});

//Routes middleware
app.use('/api', require('./app/routes/routes.js'));

//Port Connection
const PORT = process.env.PORT || 2000;
// listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
