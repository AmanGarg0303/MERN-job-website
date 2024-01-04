import express from "express";
import {
  acceptUser,
  applyJob,
  dataSubmittedAtApply,
  deleteUser,
  getAllUsers,
  getUser,
  rejectUser,
  updateUser,
  userAppliedJobs,
} from "../controllers/UserController.js";
const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/:id/applyjob", applyJob);

router.get("/:id/userAppliedJobs", userAppliedJobs);

router.get("/:jobId/:userId/userdata", dataSubmittedAtApply);

router.put("/accept/:jobId", acceptUser);
router.put("/reject/:jobId", rejectUser);

export default router;
