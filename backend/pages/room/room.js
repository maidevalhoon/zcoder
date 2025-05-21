const express = require('express')
const app = express();
const Room = require('../../model/roomModel');

app.post('/createroom', async (req, res) => {
    const { roomName, roomPassword } = req.body;
    try {
        const getRoom = await Room.find({ roomName })
        if (getRoom) return res.status(400).send('room already exists');
        else {
            const room = await Room.create({ roomName, roomPassword });
            return res.status(200).json(room);
        }

    } catch (err) {
        res.status(400).send('Error in creating the room!')
    }
})

app.post('/joinroom', async (req, res) => {
    const { roomName, roomPassword } = req.body;
    try {
        const room = await Room.find({ roomName });
        if (!room) res.status(400).send('Room not found');
        if (room.roomPassword !== roomPassword) res.status(400).send('Password mismatch');
        res.status(200).json(room);
    } catch (err) {
        res.status(400).send('Error in joining the room!')
    }
})
exports.app = app;