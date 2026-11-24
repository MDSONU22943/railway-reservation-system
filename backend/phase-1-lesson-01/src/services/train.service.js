const trains = require("../data/trains");

// Service owns the train-search business logic, not HTTP req/res objects.
function findTrains({ from, to } = {}) {
  return trains.filter((train) => {
    const sourceMatches = !from || train.source.toLowerCase() === String(from).toLowerCase();
    const destinationMatches = !to || train.destination.toLowerCase() === String(to).toLowerCase();
    return sourceMatches && destinationMatches;
  });
}

module.exports = { findTrains };
