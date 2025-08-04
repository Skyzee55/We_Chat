import express from "express";
import { checkAuth, LoginController, LogoutController, SingUpController, UpdateProfileController } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/authMiddleware.js";


const router = express.Router()

router.post('/signup', SingUpController)

router.post('/login', LoginController)

router.get('/logout',LogoutController)

router.put('/update-profile', protectRoute, UpdateProfileController)

router.get('/check', protectRoute, checkAuth)

export default router