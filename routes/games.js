import express from 'express';
import games from '../data/games.js'
const router = express.Router();

router.get('/', (req,res) => {
    res.json(games);
})

router.get('/:id', (req,res) => {
    const gameId = parseInt(req.params.id)
    const game = games.find((g) => g.id === gameId);
    if(!game){
        return res.status(404).json({Message: 'Game not found'});
    }
    res.json(game);
});

export default router;