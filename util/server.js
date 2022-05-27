const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'KDDKKZz2018%',
    database: 'content_db'
  },
  console.log(`Connected to the content_db database.`)
);

//Query database to get all from the departments
const viewDepartments = () => {
  db.query('SELECT * FROM departments', function (err, results) {
  console.table(results);
});
}

const viewRoles = () => {
  db.query('SELECT * FROM roles', function(err, results) {
  console.table(results)
 })
}


const viewEmployees = () => {
  db.query('SELECT * FROM employees', function(err, results) {
  console.table(results)
 })
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = {viewEmployees, viewRoles, viewDepartments}