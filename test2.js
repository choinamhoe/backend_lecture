const express = require("express");
const app = express();
const port = 5005;
app.use(express.json());
app.get("/", (req, res) => {
  res.json("get_5005");
});
//a라는 문자열,b라는 문자열입력
//a+b라는 문자열 반환
//params방식 : http://localhost:5005/3/4
app.get("/:a/:b", (req, res) => {
  const req_data = req.params;
  let c = req_data.a + req_data.b;
  console.log("문자열의 합 : ", c);
  console.log(req.body);
  console.log(req.query);
  res.json(c);
});
//query방식 : http://localhost:5005/query?a=aaa&b=bbb
app.get("/query", (req, res) => {
  const result = req.query; // query string
  res.json(result.a + result.b);
});
app.get("/max", (req, res) => {
  const request = req.query;
  let result = 0;
  if (parseInt(request.num1) >= parseInt(request.num2)) {
    result = parseInt(request.num1);
  } else {
    result = parseInt(request.num2);
  }
  res.json(result);
});

app.get("/:id", (req, res) => {
  const req_data = req.params;
  console.log(req_data);
  console.log(req.body);
  console.log(req.query);
  res.json(req_data);
});

app.listen(port, () => {
  console.log(`backend run : http://localhost:${port}`);
});
