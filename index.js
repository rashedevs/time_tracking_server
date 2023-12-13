import express from "express";
import mysql, { createConnection } from "mysql2";

const app = express();

const db = mysql.createConnection({
  host: "192.168.0.102",
  user: "root1",
  password: "root",
  database: "time_track",
  port: 3306,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("root" + "\0"),
  },
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

app.get("/weekly-timesheet", (req, res) => {
  const q = `
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
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/entries", (req, res) => {
  const q =
    "INSERT INTO time_entries (`user_id`,`date`, `start_time`, `end_time`, `notes`) VALUES(?)";
  const values = [
    // req.body.user_id,
    1,
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
