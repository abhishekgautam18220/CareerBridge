import express from "express";
import { deleteJob, getAllJobs, getMyJobs, postJobs, updateJob } from "../controllers/jobcontroller.js";
import { isAuthorised } from "../middleware/auth-middleware.js";

const router = express.Router();
router.get("/getAllJobs", getAllJobs)
router.get("/getMyJobs", isAuthorised,getMyJobs)
router.post("/postJobs", isAuthorised, postJobs )
router.put("/updateJob/:id", isAuthorised, updateJob )
router.delete("/deleteJob/:id", isAuthorised, deleteJob )

 export default router;