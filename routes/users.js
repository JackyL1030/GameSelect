import express from "express";
import users from "../data/users.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/view", (req, res) => {
  res.render("users", { users });
});

router.get("/view/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.render("user", { user });
});

router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json(user);
});

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email } = req.body;
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[index] = {
    id: userId,
    username,
    email,
  };
  res.json(users[index]);
});

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  const deletedUser = users.splice(index, 1);
  res.json({
    message: "User deleted successfully",
    user: deletedUser[0],
  });
});
export default router;
