import express from "express";
import { getAllBikes, getBikeById } from "../controller/bikeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get('/', getAllBikes);
router.get('/:id', getBikeById);
router.post('/', verifyToken, (req, res, next) => {
    const bikeController = require('../controller/bikeController.js');
    bikeController.createBike(req, res);
});

router.put('/:id', verifyToken, (req, res, next) => {
    const bikeController = require('../controller/bikeController.js');
    bikeController.updateBike(req, res);
});

router.delete('/:id', verifyToken, (req, res, next) => {
    const bikeController = require('../controller/bikeController.js');
    bikeController.deleteBike(req, res);
});

export default router;
