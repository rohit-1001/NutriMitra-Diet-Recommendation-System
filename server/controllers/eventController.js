const Event = require('../models/Event');

const createEvent = async (req, res) => {
    try {
        let {title, date, time, duration, mode, organiser, orgemail,  speaker, description, image, meetId} = req.body;

        date = new Date(date);

        const eventData = {
            title,
            date,
            time,
            duration,
            mode,
            organiser,
            orgemail,
            speaker,
            description,
            image,
            meetId
        };
        const event = new Event(eventData);
        await event.save();
        res.status(200).json({msg: "Event created successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Some unexpected error occurred"});
    }
};

const getEvents = async (req, res) => {
    try {
        const today = new Date();
        const events = await Event.find();
        const evnts = events.filter(obj => obj.date >= today);
        res.status(200).json(evnts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}

module.exports = { createEvent, getEvents };