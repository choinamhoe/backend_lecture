const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret-key", // 보통 .env로 관리
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // https 적용 시 true로
  })
);

app.post("/session", (req, res) => {
  const { username, age } = req.body;
  req.session.username = username;
  console.log(req.session);
  res.status(201).json({
    message: username,
  });
});

app.get("/session", (req, res) => {
  console.log(req.session);
  console.log(req.session.username);

  if (req.session.username) {
    return res.status(200).json({ message: req.session.username });
  } else {
    return res.status(401).json({ message: "세션이 없습니다." });
  }
});

app.delete("/session", (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      return res.status(500).json({ message: "세션 삭제 실패" });
    }
  });
  console.log(req.session);
  return res.status(200).json({ message: "세션 삭제 성공" });
});
app.listen(5000, () => {
  console.log("backend 실행은 nodemon 파일명.js");
});
