import mongoose from "mongoose";

const AppliedJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    githubProfile: {
      type: String,
    },
    workLink1: {
      type: String,
    },
    workLink2: {
      type: String,
    },
    hiring: {
      type: String,
    },
    availability: {
      type: String,
    },
  },
  { timestamps: true }
);

const AppliedJobModel = mongoose.model("AppliedJobs", AppliedJobSchema);
export default AppliedJobModel;
