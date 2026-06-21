import express from "express";
import games from "../data/games.js";
const router = express.Router();

router.get("/", (req, res) => {
  const genre = req.query.genre;
  if (genre) {
    const filtered = games.filter(
      (g) => g.genre.toLowerCase() === genre.toLowerCase(),
    );
    return res.json(filtered);
  }
  res.json(games);
});

router.get("/view", (req, res) => {
  res.render("games", { games });
});

router.get("/view/:id", (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = games.find((g) => g.id === gameId);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  res.render("game", { game });
});

router.get("/:id", (req, res) => {
  const gameId = parseInt(req.params.id);
  const game = games.find((g) => g.id === gameId);
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
});

router.post("/", (req, res) => {
  //console.log("BODY", req.body);
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
    releaseYear: Number(releaseYear),
    rating: Number(rating),
  };
  games.push(newGame);
  //res.status(201).json(newGame);
  res.redirect("/games/view");
});

router.put("/:id", (req, res) => {
  const gameId = parseInt(req.params.id);
  const { title, genre, releaseYear, rating } = req.body;
  if (!title || !genre || !releaseYear || !rating) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const gameIndex = games.findIndex((g) => g.id === gameId);
  if (gameIndex === -1) {
    return res.status(404).json({ message: "Game not found" });
  }
  games[gameIndex] = {
    id: gameId,
    title,
    genre,
    releaseYear: Number(releaseYear),
    rating: Number(rating),
  };
  res.json(games[gameIndex]);
});

router.delete("/:id", (req, res) => {
  const gameId = parseInt(req.params.id);
  const gameIndex = games.findIndex((g) => g.id === gameId);
  if (gameIndex === -1) {
    return res.status(404).json({ message: "Game not found" });
  }
  const deletedGame = games.splice(gameIndex, 1);
  res.json({
    message: "Game deleted successfully",
    game: deletedGame[0],
  });
});

export default router;
