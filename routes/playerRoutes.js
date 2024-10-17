const express = require('express');
const Player = require('../models/Player');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send('Player not found');
        res.json(player);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const { name, gold = 0, inventory = [] } = req.body;
    const newPlayer = new Player({ name, gold, inventory });

    try {
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).send('Error creating player');
    }
});

router.post('/:id/purchase-item', async (req, res) => {
    const { itemName, quantity } = req.body;

    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send('Player not found');

        if (player.gold < 100) return res.status(400).send('Not enough gold');

        const existingItem = player.inventory.find(item => item.itemName === itemName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            player.inventory.push({ itemName, quantity });
        }

        player.gold -= 100;
        await player.save();
        res.json(player);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/:id/delete-item', async (req, res) => {
    const { itemName } = req.body;

    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send('Player not found');

        player.inventory = player.inventory.filter(item => item.itemName !== itemName);

        await player.save();
        res.json(player);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;