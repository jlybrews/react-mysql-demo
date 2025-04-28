import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/employees?page=${currentPage}`);
        setEmployees(response.data.employees);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (err) {
        setError('Error fetching employees');
        setLoading(false);
        console.error('Error:', err);
      }
    };

    fetchEmployees();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Employee Directory</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Title</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.user_name}</td>
              <td>{`${employee.first_name} ${employee.last_name}`}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
