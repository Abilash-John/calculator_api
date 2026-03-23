import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Protect these routes using authentication token wrapper
router.use(authenticateToken);

router.get("/", UserController.getAllUsers);
router.get("/by-email/:email", UserController.getUserIdByEmail);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
