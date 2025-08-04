const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.json("get");
});
app.post("/", (req, res) => {
  const body = req.body;
  const query = req.query;
  console.log(body);
  console.log(query);
  res.json("post");
});

app.post("/:id", (req, res) => {
  const params = req.params;
  console.log(params);
  res.json("post_params");
});

app.listen(port, () => {
  console.log(`serven run: http://localhost${port}`);
});
