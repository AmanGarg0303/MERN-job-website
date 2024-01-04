import express from "express";
import {
  createJob,
  getAdminAddedJobs,
  getAllJobs,
  getAppliedUserToAParticularJob,
  getJob,
  getJobBySearch,
  getJobByTag,
  getUserNotAppliedJobs,
  jobStats,
} from "../controllers/JobControllers.js";

const router = express.Router();

router.post("/createjob", createJob);

router.get("/getjob/:id", getJob);

router.get("/getalljobs", getAllJobs);

router.get("/getjobbysearch", getJobBySearch);

router.get("/getjobbytag", getJobByTag);

router.get("/:id/jobs", getAdminAddedJobs);

router.get("/:id/appliedusersofjob", getAppliedUserToAParticularJob);

router.get("/stats/:id", jobStats);

router.get("/usernotappliedjobs/:id", getUserNotAppliedJobs);

export default router;
