const express = require("express");
const app = express();
const port = 5005;
app.use(express.json());

let notes = [];
let idCounter = 1;
//동사무소 최초 인사
app.get("/", (req, res) => {
  console.log(notes);
  res.status(200).json({ message: "정상 동작중입니다." });
});
//동사무소 접수 번호 제공
app.post("/notes", (req, res) => {
  const { content } = req.body;
  console.log("content", content);
  notes.push({ id: idCounter, content });
  idCounter += 1;
  console.log(notes);
  res.status(201).json({ message: "접수가 완료되었습니다." });
});

//동사무소 민원 처리
app.delete("/notes", (req, res) => {
  if (notes.length === 0) {
    console.log(notes);
    res.status(400).json({ message: "처리할 민원이 없습니다." });
  } else {
    //맨앞에 값 제거
    notes.shift();
    console.log(notes);
    res.status(202).json({ message: "민원처리가 완료되었습니다." });
  }
});

//동사무소 접수 컨텐츠 수정
app.patch("/notes/:id/:content", (req, res) => {
  const { id, content } = req.params;
  const note = notes.find((n) => n.id == id);
  if (!note) {
    res.status(400).json({ message: "접수번호가 없습니다." });
  } else {
    note.content = content;
    console.log(note);
    res.status(200).json({ message: "민원이 정상적으로 변경되었습니다." });
  }
});

app.listen(port, () => {
  console.log(
    `오늘도 ${port}번으로 기동 \n 실행은 nodemon test4.js http://localhost:${port}`
  );
});
