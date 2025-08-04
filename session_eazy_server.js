// npm init -y
// npm install express cookie-parser express-session jsonwebtoken body-parser dotenv
// npm install -g nodemon
// nodemon eazy_server.js

const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
require("dotenv").config();
const port = 5000;

console.log(process.env.SESSION_SECRET);
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secret-key", // 보통 .env로 관리
    // secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // https 적용 시 true로
  })
);

let notes = [];
let idCounter = 1;
app.post("/session", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "username is required" });
  }

  req.session.username = username;
  res.status(201).json({ message: `Session created for ${username}` });
});
app.get("/session", (req, res) => {
  if (!req.session.username) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  res.json({ message: `Hello, ${req.session.username}!` });
});

app.delete("/session", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.get("/notes", (req, res) => {
  console.log("res.session:", req.session);

  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id); // path param
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).send("Note not found");
  res.json(note);
});
app.get("/search", (req, res) => {
  // 제목으로 검색
  const { title } = req.query; // query string
  if (!title)
    return res.status(400).send("Query parameter 'title' is required");

  const matched = notes.filter((n) => n.title.includes(title));
  res.json(matched);
});

app.put("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).send("Not found");
  note.title = title;
  note.content = content;
  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((n) => n.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
