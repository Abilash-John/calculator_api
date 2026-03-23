import { Router } from "express";
import { CalculationController } from "../controller/CalculationController";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Secure these routes using the custom authenticateToken middleware!
router.get("/", authenticateToken, CalculationController.getAllCalculations);
router.post("/", authenticateToken, CalculationController.calculate);
router.get("/history", authenticateToken, CalculationController.getHistory);
router.get("/:id", authenticateToken, CalculationController.getCalculationById);

router.get("/user/:userId", authenticateToken, CalculationController.getCalculationsByUserId);
router.delete("/user/:userId", authenticateToken, CalculationController.deleteCalculationsByUserId);
router.delete("/", authenticateToken, CalculationController.deleteAllCalculations);

export default router;
