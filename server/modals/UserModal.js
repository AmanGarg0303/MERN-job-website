import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    about: {
      type: String,
    },
    livesIn: {
      type: String,
    },
    worksAt: {
      type: String,
    },
    country: {
      type: String,
    },
    appliedJobs: {
      type: [],
    },
    acceptedByJob: {
      type: [],
    },
    rejectedByJob: {
      type: [],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
