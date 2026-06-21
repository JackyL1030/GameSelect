import express from "express";
import reviews from "../data/reviews.js"
const router = express.Router();

router.get("/", (req, res) => {
    res.json(reviews);
})

router.get("/:id", (req,res) =>{
    const reviewId = parseInt(req.params.id);
    const review = reviews.find(r => r.id === reviewId);
    if(!review){
        return res.status(404).json({
            message:"Review not found"
        });
    }
    res.json(review)
})

export default router; 