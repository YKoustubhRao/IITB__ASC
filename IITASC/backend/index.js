const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const studentRouter = require("./routers/studentRouter");
const instructorRouter = require("./routers/instructorRouter");
const courseRouter = require("./routers/courseRouter");
const courseGuessRouter = require("./routers/courseGuessRouter");
const runRouter = require("./routers/runRouter");
const rundRouter = require("./routers/rundRouter");
const dropRouter = require("./routers/dropRouter");
const registerRouter = require("./routers/registerRouter");
// const scheduleRouter = require("./routers/scheduleRouter");
const session = require("express-session");
const server = require("http").createServer(app);
require("dotenv").config();


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);
app.use("/student",studentRouter);
app.use("/instructor",instructorRouter);
app.use("/course",courseRouter);
app.use("/guess",courseGuessRouter);
app.use("/run",runRouter);
app.use("/rund",rundRouter);
app.use("/drop", dropRouter);
app.use("/register", registerRouter);

io.on("connect", socket => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
