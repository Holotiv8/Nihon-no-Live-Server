if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", router);
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`I LOVE YOU ${port}`)
// })

module.exports = app;
