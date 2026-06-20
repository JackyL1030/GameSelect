import express from "express";
import gamesRouter from './routes/games.js'
import games from "./data/games.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views")


app.get("/", (req, res) => {
  res.send("Video Game Database Server Running");
});

app.use('/games', gamesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});