const { Router } = require("express");
const trainController = require("../controllers/train.controller");

const router = Router();
router.get("/", trainController.listTrains);

module.exports = router;
