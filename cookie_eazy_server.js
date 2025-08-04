// npm init -y
// npm install express cookie-parser express-session jsonwebtoken body-parser
// npm install -g nodemon
// nodemon eazy_server.js

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // 쿠키 허용
  })
);
app.use(cookieParser());
app.use(express.json());

let notes = [];
let idCounter = 1;

app.post("/cookie", (req, res) => {
  res.cookie("user", "cjcho", {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.send("Cookie has been set");
});

app.get("/cookie", (req, res) => {
  const userCookie = req.cookies.user;
  console.log(userCookie);
  if (!userCookie) return res.send("No user cookie found");
  res.send(`User cookie value: ${userCookie}`);
});

app.delete("/cookie", (req, res) => {
  res.clearCookie("user");
  res.send("User cookie cleared");
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.get("/notes", (req, res) => {
  console.log("req.cookies.user:", req.cookies.user);
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
