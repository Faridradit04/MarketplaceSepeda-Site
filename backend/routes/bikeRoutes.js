import express from "express";
import { createBike, getAllBikes, getBikeById, updateBike, deleteBike } from "../controller/bikeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get('/', getAllBikes);
router.get('/:id', getBikeById);

// Protected routes
router.post('/', verifyToken, createBike);
router.put('/:id', verifyToken, updateBike);
router.delete('/:id', verifyToken, deleteBike);

export default router;