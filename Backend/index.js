const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// GET endpoint for fetching customers with optional search by name or location, sorting by created date/time, and pagination
app.get('/api/customers', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const offset = (page - 1) * 20; // Assuming 20 users per page
    const searchQuery = `%${req.query.search}%`;
    let sortQuery = '';

    // Sort by created date if requested
    if (req.query.sort === 'created_date') {
      sortQuery = 'ORDER BY date_created';
    }
    // Sort by created time if requested
    else if (req.query.sort === 'created_time') {
      sortQuery = 'ORDER BY time_created';
    }

    let query = `SELECT * FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1 ${sortQuery} LIMIT 20 OFFSET $2`;
    const { rows } = await db.query(query, [searchQuery, offset]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
