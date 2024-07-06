import express from "express";
import { employerGetAllApplications, jobSeekerDeleteApplications, jobSeekerGetAllApplications, postApplication } from "../controllers/applicationcontroller.js";
import { isAuthorised } from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/employer/getAll" , isAuthorised, employerGetAllApplications)
router.get("/jobSeeker/getAll" , isAuthorised, jobSeekerGetAllApplications)
router.delete("/jobSeeker/delete/:id", isAuthorised, jobSeekerDeleteApplications)
router.post("/post", isAuthorised, postApplication)

 export default router;