const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gold: { type: Number, required: true, default: 0 },
    inventory: { type: [itemSchema], default: [] }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;