import express from "express";
import { auth, isStudent, isInstructor } from "../middlewares/Auth";
import {
  signup,
  login,
  StudentDash,
  InstructorDash,
} from "../controllers/Auth";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/student", auth, isStudent, StudentDash);
router.get("/instructor", auth, isInstructor, InstructorDash);

export default router;
