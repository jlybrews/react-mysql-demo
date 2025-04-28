import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Routes
app.get('/api/employees', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // First, get total count
  connection.query('SELECT COUNT(*) as total FROM employees', (err, countResult) => {
    if (err) {
      console.error('Error getting total count:', err);
      res.status(500).json({ error: 'Error fetching employees' });
      return;
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Then get paginated data
    connection.query(
      'SELECT * FROM employees LIMIT ? OFFSET ?',
      [limit, offset],
      (err, results) => {
        if (err) {
          console.error('Error fetching employees:', err);
          res.status(500).json({ error: 'Error fetching employees' });
          return;
        }
        res.json({
          employees: results,
          pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: total,
            itemsPerPage: limit
          }
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});