import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddJob = () => {
  const [loading, setLoading] = useState(false);

  const [requirementsTags, setRequirementsTags] = useState([]);
  const handleRequirementsTags = (e) => {
    setRequirementsTags(e.target.value.split(","));
  };

  const [perksTags, setPerksTags] = useState([]);
  const handlePerksTags = (e) => {
    setPerksTags(e.target.value.split(","));
  };

  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    location: "",
    companyName: "",
    coverImg: "",
    mainImg: "",
    experience: "",
    workLevel: "",
    employeeType: "",
    salary: "",
    desc: "",
    duties: "",
  });

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setJobDetails({
      jobTitle: "",
      location: "",
      companyName: "",
      coverImg: "",
      mainImg: "",
      experience: "",
      workLevel: "",
      employeeType: "",
      salary: "",
      requirementsTags: "",
      perksTags: "",
      desc: "",
      duties: "",
    });
  };
  const { currentUser } = useSelector((state) => state.user);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser.user.isAdmin) {
      try {
        await axios.post(`/jobs/createjob`, {
          userId: currentUser.user._id,
          jobTitle: jobDetails.jobTitle,
          location: jobDetails.location,
          companyName: jobDetails.companyName,
          coverImg: jobDetails.coverImg,
          mainImg: jobDetails.mainImg,
          experience: jobDetails.experience,
          workLevel: jobDetails.workLevel,
          employeeType: jobDetails.employeeType,
          salary: jobDetails.salary,
          requirements: requirementsTags,
          perks: perksTags,
          desc: jobDetails.desc,
          duties: jobDetails.duties,
        });
        toast.success("Job has been created");
        setLoading(false);
        resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-5 sm:px-8">
      <div className="p-3 sm:p-5 text-white bg-[#1f1d27] rounded-lg min-h-screen">
        <h1 className="font-bold mb-5 text-base lg:text-xl text-center">
          Add jobs
        </h1>

        <div>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Job Title</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Job Role"
              id="jobTitle"
              name="jobTitle"
              onChange={handleChange}
              value={jobDetails.jobTitle}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Job Location</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Job location"
              id="location"
              name="location"
              onChange={handleChange}
              value={jobDetails.location}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Company Name</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Company name"
              id="companyName"
              name="companyName"
              onChange={handleChange}
              value={jobDetails.companyName}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Cover Image URL</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="cover image url"
              id="coverImg"
              name="coverImg"
              onChange={handleChange}
              value={jobDetails.coverImg}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Main Logo URL</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="main logo url"
              id="mainImg"
              name="mainImg"
              onChange={handleChange}
              value={jobDetails.mainImg}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Experience</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="employee experience"
              id="experience"
              name="experience"
              onChange={handleChange}
              value={jobDetails.experience}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Work Level</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="work level, senior level, junior level, fresher"
              id="workLevel"
              name="workLevel"
              onChange={handleChange}
              value={jobDetails.workLevel}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Employee Type</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="employee type, full time, part time, internship"
              id="employeeType"
              name="employeeType"
              onChange={handleChange}
              value={jobDetails.employeeType}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Salary</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Salary"
              id="salary"
              name="salary"
              onChange={handleChange}
              value={jobDetails.salary}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">
              Required Technologies
            </span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Require tech, use commas without space"
              id="requirements"
              name="requirements"
              onChange={handleRequirementsTags}
              // value={jobDetails.requirements}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Perks</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Perks offered, use commas without space"
              id="perks"
              name="perks"
              onChange={handlePerksTags}
              // value={jobDetails.perks}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Job Description</span>
            <textarea
              className="bg-gray-100 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full text-black lg:flex-[3] "
              placeholder="Job description"
              rows={5}
              id="desc"
              name="desc"
              onChange={handleChange}
              value={jobDetails.desc}
            ></textarea>
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1">Employee Duties</span>
            <textarea
              className="bg-gray-100 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full text-black lg:flex-[3] "
              placeholder="Employee day to day duties"
              rows={5}
              id="duties"
              name="duties"
              onChange={handleChange}
              value={jobDetails.duties}
            ></textarea>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base disabled:cursor-not-allowed"
            onClick={handleCreateJob}
            disabled={loading}
          >
            Create job
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddJob;
