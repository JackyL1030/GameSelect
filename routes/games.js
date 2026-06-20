import express from "express";
import games from "../data/games.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json(games);
});

router.get("/:id", (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = games.find((g) => g.id === gameId);
  if (!game) {
    return res.status(404).json({ Message: "Game not found" });
  }
  res.json(game);
});

router.post("/", (req, res) => {
  const { title, genre, releaseYear, rating } = req.body;
  if (!title || !genre || !releaseYear || !rating) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const newId = games.length + 1;
  const newGame = {
    id: newId,
    title,
    genre,
    releaseYear,
    rating,
  };
  games.push(newGame);
  res.status(201).json(newGame);
});

export default router;
