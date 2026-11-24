const trainService = require("../services/train.service");

// Controller translates HTTP input into a service call and formats the response.
function listTrains(req, res) {
  const { from, to } = req.query;
  const matchingTrains = trainService.findTrains({ from, to });

  return res.status(200).json({
    count: matchingTrains.length,
    data: matchingTrains
  });
}

module.exports = { listTrains };
