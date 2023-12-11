import express from "express";
import mysql, { createConnection } from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "redass@15108058",
  database: "time_track",
});

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
    1,
    "2023-12-12",
    "06:35:00",
    "08:20:00",
    "notes from backend",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("new entry added");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
