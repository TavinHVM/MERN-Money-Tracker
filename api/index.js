const express = require("express");
const app = express();

app.get("/api/test", (req, res) => {
  res.json({ body: "test ok" });
});

app.post("/api/transaction", (req, res) => {
  res.json(req.body);
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
