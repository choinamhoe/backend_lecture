// npm init -y
// npm install express cookie-parser express-session
// npm install jsonwebtoken body-parser cors
// npm install -g nodemon

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

let notes = [];
let idCounter = 1;

app.post("/cookie", (req, res) => {
  res.cookie("user", "namhoechoi", {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.send("Cookie has been set");
});
app.get("/cookie", (req, res) => {
  try {
    console.log(req.cookies);
    const result = req.cookies.user;
    console.log(req);
    console.log(result);
    res.status(200).json({ message: result });
  } catch (e) {
    res.status(500).json({ message: "서버 오류발생" });
  }
});
app.delete("/cookie", (req, res) => {
  res.clearCookie("user");
  res.status(200).json({ message: "쿠키가 정상 삭제되었습니다." });
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);
  console.log(notes);
  res.status(201).json(newNote);
});

app.get("/notes", (req, res) => {
  //   console.log("req.cookies.user:", req.cookies.user);
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id); // path param
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).send("Note not found");
  res.json(note);
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
  console.log(notes);
  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log("백엔드 시작은 nodemon 파일명.js");
});
