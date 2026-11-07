const express = require("express");

const app = express();
const PORT = 3001;

// Parse incoming JSON request bodies so they are available on req.body.
app.use(express.json());

// In-memory sample data for learning.
// Data will reset whenever the server restarts.
// PostgreSQL will replace this array in a later phase.
let trains = [
    {
        trainNumber: 12368,
        trainName: "Vikramshila Express",
        source: "Bhagalpur",
        destination: "Anand Vihar Terminal"
    },
    {
        trainNumber: 12350,
        trainName: "Bhagalpur Express",
        source: "Bhagalpur",
        destination: "New Delhi"
    }
];

// GET /trains
// Return all trains. Optional query parameters filter by source and destination.
// Example: GET /trains?from=Bhagalpur&to=New%20Delhi
app.get("/trains", (req, res) => {
    const { from, to } = req.query;

    let filteredTrains = trains;

    if (from) {
        filteredTrains = filteredTrains.filter(
            (train) => train.source.toLowerCase() === String(from).toLowerCase()
        );
    }

    if (to) {
        filteredTrains = filteredTrains.filter(
            (train) => train.destination.toLowerCase() === String(to).toLowerCase()
        );
    }

    return res.status(200).json({
        count: filteredTrains.length,
        data: filteredTrains
    });
});

// GET /trains/:trainNumber
// Return one train identified by its path parameter.
app.get("/trains/:trainNumber", (req, res) => {
    const trainNumber = Number(req.params.trainNumber);

    if (!Number.isInteger(trainNumber)) {
        return res.status(400).json({ message: "Train number must be an integer." });
    }

    const train = trains.find((item) => item.trainNumber === trainNumber);

    if (!train) {
        return res.status(404).json({ message: "Train not found." });
    }

    return res.status(200).json({ data: train });
});

// POST /trains
// Create a train using the JSON request body.
app.post("/trains", (req, res) => {
    const { trainNumber, trainName, source, destination } = req.body ?? {};
    const parsedTrainNumber = Number(trainNumber);

    if (
        !Number.isInteger(parsedTrainNumber) ||
        typeof trainName !== "string" || !trainName.trim() ||
        typeof source !== "string" || !source.trim() ||
        typeof destination !== "string" || !destination.trim()
    ) {
        return res.status(400).json({
            message: "Provide an integer trainNumber and non-empty trainName, source, and destination."
        });
    }

    const alreadyExists = trains.some(
        (train) => train.trainNumber === parsedTrainNumber
    );

    if (alreadyExists) {
        return res.status(409).json({ message: "A train with this number already exists." });
    }

    const newTrain = {
        trainNumber: parsedTrainNumber,
        trainName: trainName.trim(),
        source: source.trim(),
        destination: destination.trim()
    };

    trains.push(newTrain);

    return res.status(201).json({
        message: "Train created successfully.",
        data: newTrain
    });
});

// PUT /trains/:trainNumber
// Replace the train's complete editable representation.
app.put("/trains/:trainNumber", (req, res) => {
    const trainNumber = Number(req.params.trainNumber);

    if (!Number.isInteger(trainNumber)) {
        return res.status(400).json({ message: "Train number must be an integer." });
    }

    const trainIndex = trains.findIndex(
        (train) => train.trainNumber === trainNumber
    );

    if (trainIndex === -1) {
        return res.status(404).json({ message: "Train not found." });
    }

    const { trainName, source, destination } = req.body ?? {};

    if (
        typeof trainName !== "string" || !trainName.trim() ||
        typeof source !== "string" || !source.trim() ||
        typeof destination !== "string" || !destination.trim()
    ) {
        return res.status(400).json({
            message: "PUT requires non-empty trainName, source, and destination."
        });
    }

    const updatedTrain = {
        trainNumber,
        trainName: trainName.trim(),
        source: source.trim(),
        destination: destination.trim()
    };

    trains[trainIndex] = updatedTrain;

    return res.status(200).json({
        message: "Train replaced successfully.",
        data: updatedTrain
    });
});

// PATCH /trains/:trainNumber
// Update only the fields supplied in the JSON request body.
app.patch("/trains/:trainNumber", (req, res) => {
    const trainNumber = Number(req.params.trainNumber);

    if (!Number.isInteger(trainNumber)) {
        return res.status(400).json({ message: "Train number must be an integer." });
    }

    const train = trains.find((item) => item.trainNumber === trainNumber);

    if (!train) {
        return res.status(404).json({ message: "Train not found." });
    }

    const allowedFields = ["trainName", "source", "destination"];
    const updates = req.body ?? {};
    const providedFields = Object.keys(updates);

    if (providedFields.length === 0) {
        return res.status(400).json({ message: "Provide at least one field to update." });
    }

    const hasInvalidField = providedFields.some(
        (field) => !allowedFields.includes(field)
    );

    if (hasInvalidField) {
        return res.status(400).json({
            message: "Only trainName, source, and destination can be updated."
        });
    }

    for (const field of providedFields) {
        if (typeof updates[field] !== "string" || !updates[field].trim()) {
            return res.status(400).json({ message: `${field} must be a non-empty string.` });
        }
    }

    Object.assign(train, Object.fromEntries(
        providedFields.map((field) => [field, updates[field].trim()])
    ));

    return res.status(200).json({
        message: "Train updated successfully.",
        data: train
    });
});

// DELETE /trains/:trainNumber
// Delete one train identified by its path parameter.
app.delete("/trains/:trainNumber", (req, res) => {
    const trainNumber = Number(req.params.trainNumber);

    if (!Number.isInteger(trainNumber)) {
        return res.status(400).json({ message: "Train number must be an integer." });
    }

    const trainIndex = trains.findIndex(
        (train) => train.trainNumber === trainNumber
    );

    if (trainIndex === -1) {
        return res.status(404).json({ message: "Train not found." });
    }

    trains.splice(trainIndex, 1);

    // 204 means the deletion succeeded and the response has no body.
    return res.status(204).send();
});

// Handle malformed JSON request bodies.
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({ message: "Request body must contain valid JSON." });
    }

    return next(error);
});

app.listen(PORT, () => {
    console.log(`RailBook Lesson 2 server running at http://localhost:${PORT}`);
});
