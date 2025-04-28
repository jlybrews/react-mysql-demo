import mysql from 'mysql2';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // Add SSL configuration for Railway
  ssl: {
    rejectUnauthorized: false
  }
});

// Read JSON file
const jsonData = JSON.parse(fs.readFileSync('./employees.json', 'utf8'));

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Prepare the insert statement
  const insertQuery = `
    INSERT INTO employees
    (user_name, first_name, last_name, email, gender, title, department)
    VALUES ?
  `;

  // Transform JSON data into array of values
  const values = jsonData.map(employee => [
    employee.user_name,
    employee.first_name,
    employee.last_name,
    employee.email,
    employee.gender,
    employee.title,
    employee.department
  ]);

  // Execute the insert query
  connection.query(insertQuery, [values], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log(`Successfully inserted ${results.affectedRows} records`);
    connection.end();
  });
});