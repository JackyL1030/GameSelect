import express from "express";
import gamesRouter from "./routes/games.js";
import games from "./data/games.js";

import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

function logger(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
}

function timeStamp(req, res, next) {
  req.time = new Date().toLocaleString();
  next();
}

app.use(logger);
app.use(timeStamp);

app.get("/", (req, res) => {
  res.send("Video Game Database Server Running");
});

app.use("/games", gamesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.log("Error:", err);
  res.status(500).json({
    message: "Server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
