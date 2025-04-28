CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  gender VARCHAR(20),
  title VARCHAR(100),
  department VARCHAR(100)
);

INSERT INTO employees (user_name, first_name, last_name, email, gender, title, department) VALUES
('jzuan0', 'Jacquette', 'Zuan', 'jzuan0@tumblr.com', 'Female', 'Quality Engineer', 'Human Resources');