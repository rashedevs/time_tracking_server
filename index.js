import express from "express";
import mysql, { createConnection } from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "redass@15108058",
  database: "time_track",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from backend");
});

app.get("/entries", (req, res) => {
  const q = "SELECT * FROM time_entries";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/entries", (req, res) => {
  const q =
    "INSERT INTO time_entries (`user_id`,`date`, `start_time`, `end_time`, `notes`) VALUES(?)";
  const values = [
    req.body.user_id,
    req.body.date,
    req.body.start_time,
    req.body.end_time,
    req.body.notes,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("New time entry created successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
