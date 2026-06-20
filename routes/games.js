import express from 'express';
import games from '../data/games.js'
const router = express.Router();

router.get('/', (req,res) => {
    res.json(games);
})

export default router;