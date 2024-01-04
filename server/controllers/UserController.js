import UserModel from "../modals/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JobModel from "../modals/JobModel.js";
import AppliedJobModel from "../modals/AppliedJobsModal.js";
import mongoose from "mongoose";

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();

    users = users.map((user) => {
      const { password, ...other } = user._doc;
      return other;
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a user
export const getUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  try {
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(404).json("User not found!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update user
export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SEC_KEY
      );

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await UserModel.findById(id);
  !user && res.status(404).json("User not found!");

  const { _id, currentUserAdminStatus } = req.body;

  if (id === _id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User has been deleted!");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
};

export const applyJob = async (req, res) => {
  const id = req.params.id; //job id

  const { _id } = req.body; //userId

  try {
    const jobWeWantToApply = await JobModel.findById(id); //the job who we want to apply
    const findingUs = await UserModel.findById(_id); // it's us, who wants to follow someone

    if (!jobWeWantToApply.appliedBy.includes(_id)) {
      await jobWeWantToApply.updateOne({ $push: { appliedBy: _id } });
      await findingUs.updateOne({ $push: { appliedJobs: id } });

      try {
        const newAppliedJobModal = new AppliedJobModel({
          jobId: id,
          userId: _id,
          githubProfile: req.body.githubProfile,
          workLink1: req.body.workLink1,
          workLink2: req.body.workLink2,
          hiring: req.body.hiring,
          availability: req.body.availability,
        });
        await newAppliedJobModal.save();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

      res.status(200).json("Job Applied!!");
    } else {
      res.status(403).json("Job is already Applied by you!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//user applied jobs
export const userAppliedJobs = async (req, res) => {
  const id = req.params.id; //userid

  const user = await UserModel.findById(id);
  !user && res.status(404).json("User not found!");

  try {
    const { appliedJobs } = user._doc;
    const a = [];
    for (let i = 0; i < appliedJobs.length; i++) {
      const element = await appliedJobs[i];
      const fetchdata = await JobModel.findById({ _id: element });
      a.push(fetchdata);
    }
    res.status(200).json(a);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching user apply job data
export const dataSubmittedAtApply = async (req, res) => {
  const id = req.params.jobId; //job id
  const _id = req.params.userId; //user id

  try {
    const job = await JobModel.findById(id);
    !job && res.status(404).json("Job not found!");

    const user = await UserModel.findOne({ _id });
    !user && res.status(404).json("User not found!");

    const appliedJobId = await AppliedJobModel.findOne({
      jobId: id,
      userId: _id,
    });
    res.status(200).json(appliedJobId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept or reject, like and dislike functionality from itube
// move this to job controller or if admin uses it, leave it here

// export const acceptUser = async (req, res) => {
//   const id = req.params.jobId; //job id
//   const _id = req.body.userId; //user id

//   try {
//     const job = await JobModel.findById(id);
//     !job && res.status(404).json("Job not found!");

//     const user = await UserModel.findOne({ _id });
//     !user && res.status(404).json("User not found!");

//     if (!job.acceptedUsers.includes(_id)) {
//       await user.updateOne({ $push: { acceptedByJob: id } });
//       await job.updateOne({ $push: { acceptedUsers: _id } });

//       res.status(200).json("Accepted!");
//     } else {
//       res.status(403).json("Already Accepted!!");
//     }

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const rejectUser = async (req, res) => {
//   const id = req.params.jobId; //job id
//   const _id = req.body.userId; //user id

//   try {
//     const job = await JobModel.findById(id);
//     !job && res.status(404).json("Job not found!");

//     const user = await UserModel.findOne({ _id });
//     !user && res.status(404).json("User not found!");

//     if (!job.rejectedUsers.includes(_id)) {
//       await user.updateOne({ $push: { rejectedByJob: id } });
//       await job.updateOne({ $push: { rejectedUsers: _id } });

//       res.status(200).json("Rejected!");
//     } else {
//       res.status(403).json("Already Rejected!");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// if (!job.acceptedUsers.includes(_id)) {
//   if (job.rejectedUsers.includes(_id)) {
//     res.status(403).json("Already in rejected users.");
//   } else {
//     await user.updateOne({ $push: { acceptedByJob: id } });
//     await job.updateOne({ $push: { acceptedUsers: _id } });
//     res.status(200).json("Accepted!");
//   }
// } else {
//   res.status(403).json("Already Accepted!!");
// }

export const acceptUser = async (req, res) => {
  const id = req.params.jobId; //job id
  const _id = req.body.userId; //user id

  try {
    const job = await JobModel.findById(id);
    !job && res.status(404).json("Job not found!");

    const user = await UserModel.findOne({ _id });
    !user && res.status(404).json("User not found!");

    if (!job.acceptedUsers.includes(_id)) {
      if (job.rejectedUsers.includes(_id)) {
        res.status(403).json("Already in rejected users.");
      } else {
        await user.updateOne({ $push: { acceptedByJob: id } });
        await job.updateOne({ $push: { acceptedUsers: _id } });
        res.status(200).json("Accepted!");
      }
    } else {
      res.status(403).json("Already Accepted!!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectUser = async (req, res) => {
  const id = req.params.jobId; //job id
  const _id = req.body.userId; //user id

  try {
    const job = await JobModel.findById(id);
    !job && res.status(404).json("Job not found!");

    const user = await UserModel.findOne({ _id });
    !user && res.status(404).json("User not found!");

    if (!job.rejectedUsers.includes(_id)) {
      if (job.acceptedUsers.includes(_id)) {
        res.status(403).json("Already in accepted users!");
      } else {
        await user.updateOne({ $push: { rejectedByJob: id } });
        await job.updateOne({ $push: { rejectedUsers: _id } });
        res.status(200).json("Rejected!");
      }
    } else {
      res.status(403).json("Already Rejected!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
