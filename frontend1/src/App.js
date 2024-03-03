import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerTable.css'; // Import external stylesheet

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchQuery, sortBy]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers?page=${currentPage}&search=${searchQuery}&sort=${sortBy}`);
      if (response.data.length === 0) {
        setErrorMessage('No data found.');
      } else {
        setErrorMessage('');
        setCustomers(response.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setErrorMessage('Internal server error.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByDate = () => {
    setSortBy('created_date');
  };

  const handleSortByTime = () => {
    setSortBy('created_time');
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="customer-table-container">
      <h1>Customer Table</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search by name or location" value={searchQuery} onChange={handleSearchChange} />
      </div>
      <div className="sorting-options">
        <button onClick={handleSortByDate}>Sort by Date</button>
        <button onClick={handleSortByTime}>Sort by Time</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {customers.length > 0 &&
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Location</th>
              <th>Date Created</th>
              <th>Time Created</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.sno}>
                <td>{customer.sno}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.phone}</td>
                <td>{customer.age}</td>
                <td>{customer.location}</td>
                <td>{customer.date_created}</td>
                <td>{customer.time_created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default CustomerTable;
