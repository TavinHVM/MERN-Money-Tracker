const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Transaction = require("./models/Transaction.js");
const { default: mongoose } = require("mongoose");
const TransactionModel = require("./models/Transaction.js");

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ body: "test ok" });
});

app.post("/api/transaction", async(req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, datetime, description, price } = req.body;
  const transaction = await Transaction.create({name, datetime, description, price});
  res.json(transaction);
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
