import express from "express";
import users from "../data/users.js"
const router = express.Router();

router.get("/", (req,res) => {
    res.json(users);
})

router.get("/:id", (req,res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if(!user){
        return res.status(404).json({
            message:"User not found",
        })
    }
    res.json(user)
})

export default router;