import express from "express";
import { register , login, logout} from "../controllers/usercontroller.js";
import { isAuthorised } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorised, logout);

export default router;