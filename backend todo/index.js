const express = require("express");
const ConnectDB = require("./config/db");
require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");
const cors = require("cors");
const { protect } = require("./middlewares/auth");
const app = express();

app.use(express.json());

ConnectDB();
app.use(cors());
//check api
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(`/api/users`, userRoute);
 app.use(`/api/tasks`, taskRoute);


app.listen(process.env.PORT, () =>
  console.log(`server started on port: ${process.env.PORT}`)
);
