import express from "express";
import mysql, { createConnection } from "mysql2";
import dotenv from "dotenv";
import cors from "cors"; // Import cors directly

dotenv.config();
const app = express();

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Root endpoint
app.get("/", (req, res) => {
  res.json("Hello from the backend");
});

// Get all time entries
app.get("/entries", (req, res) => {
  const query = "SELECT * FROM time_entries";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get weekly timesheet
app.get("/weekly-timesheet", (req, res) => {
  const query = `
    SELECT
      WEEK(date) AS week_number,
      DAYNAME(date) AS day,
      SUM(TIMESTAMPDIFF(MINUTE, start_time, end_time) / 60.0) AS total_hours
    FROM
      time_entries
    WHERE
      user_id = 1
    GROUP BY
      week_number, DAYNAME(date);
  `;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add a new time entry
app.post("/entries", (req, res) => {
  const query =
    "INSERT INTO time_entries (`user_id`,`date`, `start_time`, `end_time`, `notes`) VALUES(?)";
  const values = [
    1, //req.body.user_id
    req.body.date,
    req.body.start_time,
    req.body.end_time,
    req.body.notes,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("New time entry created successfully");
  });
});

// Update a time entry
app.put("/entries/:id", (req, res) => {
  const entryId = req.params.id;
  const query =
    "UPDATE time_entries SET `date`=?, `start_time`=?, `end_time`=?, `notes`=? WHERE id=?";
  const values = [
    req.body.date,
    req.body.start_time,
    req.body.end_time,
    req.body.notes,
    entryId,
  ];
  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Time entry updated successfully");
  });
});

// Delete a time entry
app.delete("/entries/:id", (req, res) => {
  const entryId = req.params.id;
  const query = "DELETE FROM time_entries WHERE id=?";
  db.query(query, [entryId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Time entry deleted successfully");
  });
});

// Start the server
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
