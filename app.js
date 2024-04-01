const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Initialize express app
const app = express();
const port = 3000;

// Set up the database
const db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user_actions (action TEXT)");
});

// Middleware to parse request body
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Endpoint to handle action data submission
app.post('/submit-action', (req, res) => {
  const action = req.body.action;
  db.run("INSERT INTO user_actions (action) VALUES (?)", [action], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    res.send({ message: 'Action saved!', actionId: this.lastID });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});