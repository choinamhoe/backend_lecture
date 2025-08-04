const express = require("express");
const app = express();
const port = 5005;
app.use(express.json());
const db = {
  id1: "pwd1",
  id2: "pwd2",
};
app.get("/", (req, res) => {
  res.json("get_5000");
  res.status(400).json({ message: "pass" });
});
app.post("/sign", (req, res) => {
  const result = req.body;
  console.log(result);
  if (Object.keys(db).includes(result.id)) {
    console.log("id가 있습니다.");
    if (db[result.id] === result.password) {
      res.status(200).json({ message: "로그인에 성공하셨습니다." });
    } else {
      res.status(402).json({ message: "로그인에 실패하셨습니다." });
    }
  } else {
    res.status(402).json({ message: "로그인에 실패하셨습니다." });
  }
});

app.listen(port, () => {
  console.log(`backend run : http://localhost:${port}`);
});
