import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import { strategyPassport } from "../middlewares/strategy.middleware.js";

const router = Router();

router.get('/current', passport.authenticate('jwt'), sessionController.current);

router.post('/register', passport.authenticate('register'), sessionController.createUser);
router.post('/login', strategyPassport('login'), sessionController.userLogin);

router.delete('/login', sessionController.logOut);

export default router;