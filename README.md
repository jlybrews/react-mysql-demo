# React MySQL Employee Directory

A React application that connects to a MySQL database to display employee information.

## Prerequisites

- Node.js (v14 or higher)
- MySQL database (hosted on Railway)
- Railway account and database credentials

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Railway MySQL credentials:
   ```
   DB_HOST=your-railway-host
   DB_USER=your-railway-user
   DB_PASSWORD=your-railway-password
   DB_NAME=your-railway-database
   DB_PORT=your-railway-port
   ```

4. Import the database schema:
   - Use the `employees.sql` file to create the table and insert sample data
   - You can import this through your Railway dashboard or MySQL client

## Running the Application

1. Start the backend server:
   ```bash
   node server.js
   ```

2. In a new terminal, start the React development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Features

- Display employee information in a clean, responsive table
- Real-time data fetching from MySQL database
- Loading and error states
- Formatted employee information and pagination

## Technologies Used

- React
- Vite
- Express.js
- MySQL
- Axios
- CSS
