import { Router } from "express";
import noteController from "../controllers/note.controller.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', noteController.getAll);
router.get('/:id', authToken, noteController.getByID);

router.post('/', authToken, noteController.createNote);

router.put('/:id', authToken, noteController.update);

router.delete('/:id', authToken, noteController.deleteNote);

export default router;