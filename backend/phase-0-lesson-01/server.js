const express = require("express");

const app = express();
const PORT = 3000;

// Sample train data for Lesson 1.
// This is hard-coded for learning; PostgreSQL will be introduced later.
const trains = [
    {
        trainNumber: 12368,
        trainName: "Vikramshila Express"
    },
    {
        trainNumber: 12350,
        trainName: "Bhagalpur Express"
    }
];

// Handle GET requests sent to /trains.
app.get("/trains", (req, res) => {
    res.status(200).json(trains);
});

// Start the HTTP server.
app.listen(PORT, () => {
    console.log(`RailBook learning server running at http://localhost:${PORT}`);
});
