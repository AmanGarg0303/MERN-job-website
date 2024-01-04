import JobModel from "../modals/JobModel.js";
import UserModel from "../modals/UserModal.js";
import AppliedJobModel from "../modals/AppliedJobsModal.js";

//creating a new job
export const createJob = async (req, res) => {
  try {
    const newJob = new JobModel(req.body);

    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get job
export const getJob = async (req, res) => {
  const id = req.params.id;

  try {
    const job = await JobModel.findById(id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a job
export const deleteJob = async (req, res) => {
  const id = req.params.id;

  try {
    //while deleting the job, remove job id from user appliedJobs modal.
    /*
    first get the job applicants of that job, then remove the jobId from user appliedTo array 
    */
    JobModel.findByIdAndDelete(id);
    res.status(200).json("Job has been deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all job
export const getAllJobs = async (req, res) => {
  try {
    const allJobs = await JobModel.find().sort({ createdAt: -1 });
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get jobs by search
export const getJobBySearch = async (req, res) => {
  const query = req.query.q;
  try {
    const jobs = await JobModel.find({
      jobTitle: { $regex: query, $options: "i" },
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get jobs by tags
export const getJobByTag = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const jobs = await JobModel.find({
      requirements: { $in: tags },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get jobs added by a particular admin
export const getAdminAddedJobs = async (req, res) => {
  const id = req.params.id; //userId

  try {
    const userJobs = await JobModel.find({
      userId: id,
    }).sort({ createdAt: -1 });
    res.status(200).json(userJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get applied users profile data to a particular job
export const getAppliedUserToAParticularJob = async (req, res) => {
  const id = req.params.id; //jobId

  const job = await JobModel.findById(id);
  !job && res.status(404).json("Job not found!");

  try {
    const { appliedBy } = job._doc;
    const a = [];

    for (let i = 0; i < appliedBy.length; i++) {
      const element = await appliedBy[i];
      const fetchData = await UserModel.findById({ _id: element });
      a.push(fetchData);
    }

    const c = a.map((b) => ({
      username: b.username,
      email: b.email,
      about: b.about,
      worksAt: b.worksAt,
      livesIn: b.livesIn,
      country: b.country,
      profilePicture: b.profilePicture,
      userId: b._id,
    }));

    res.status(200).json(c);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get job stats
export const jobStats = async (req, res) => {
  const id = req.params.id; //admin id

  try {
    const data = await JobModel.aggregate([
      {
        $match: {
          userId: id,
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user not applied jobs only
export const getUserNotAppliedJobs = async (req, res) => {
  const id = req.params.id; //userid

  const user = await UserModel.findOne({ id });
  !user && res.status(404).json("User not found!");
  try {
    const b = await JobModel.find({ appliedBy: { $nin: [id] } }).sort({
      createdAt: -1,
    });
    res.status(200).json(b);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
