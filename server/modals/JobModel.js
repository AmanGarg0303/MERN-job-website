import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    duties: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    workLevel: {
      type: String,
      required: true,
    },
    employeeType: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
    },
    mainImg: {
      type: String,
    },
    requirements: {
      type: [],
      required: true,
    },
    perks: {
      type: [],
      required: true,
    },
    appliedBy: {
      type: [],
    },
    acceptedUsers: {
      type: [],
    },
    rejectedUsers: {
      type: [],
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Jobs", JobSchema);
export default JobModel;
