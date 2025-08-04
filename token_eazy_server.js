// npm init -y
// npm install express cookie-parser express-session jsonwebtoken body-parser
// npm install -g nodemon
// nodemon eazy_server.js

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5000;
const SECRET_KEY = "your-secret-key";

app.use(cors());
app.use(express.json());

let notes = [];
let idCounter = 1;
// backend 토큰 발급
const username = "user";
const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
console.log("발급된 토큰:", token);

// 토큰 검증
const decoded = jwt.verify(token, SECRET_KEY);
console.log("토큰 검증 결과:", decoded);
jwt.verify(token, SECRET_KEY, (err, decoded) => {
  if (err) {
    console.error("토큰 검증 실패:", err.message);
  } else {
    console.log("토큰 검증 성공, payload:", decoded);
  }
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.get("/notes", (req, res) => {
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
