import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { applyToJob } from "../redux/userSlice";
import { appliedByUser } from "../redux/jobSlice";

const ApplyJobPage = () => {
  const path = useLocation();
  const pathname = path.pathname.split("/")[2];

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, [pathname]);

  const [applyJobDetails, setApplyJobDetails] = useState({
    githubProfile: "",
    workLink1: "",
    workLink2: "",
    hiring: "",
    availability: "",
  });

  const handleChange = (e) => {
    setApplyJobDetails({ ...applyJobDetails, [e.target.name]: e.target.value });
  };

  const { currentUser } = useSelector((state) => state.user);
  const { currentJob } = useSelector((state) => state.job);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const applyJob = async () => {
    setLoading(true);
    try {
      await axios.put(`/users/${pathname}/applyjob`, {
        _id: currentUser?.user?._id,
        githubProfile: applyJobDetails.githubProfile,
        workLink1: applyJobDetails.workLink1,
        workLink2: applyJobDetails.workLink2,
        hiring: applyJobDetails.hiring,
        availability: applyJobDetails.availability,
      });
      dispatch(applyToJob(currentJob?._id));
      dispatch(appliedByUser(currentUser?.user?._id));
      setLoading(false);
      toast.success("Applied for job");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="p-5 sm:px-8">
      <div className="p-3 sm:p-5 text-white bg-[#1f1d27] rounded-lg min-h-screen">
        <h1 className="font-bold mb-5 text-base lg:text-xl text-center">
          Applying for {currentJob?.jobTitle} at {currentJob?.companyName}
        </h1>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Github Profile</span>
          <input
            className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
            type="text"
            placeholder="Github Profile"
            id="githubProfile"
            name="githubProfile"
            required
            onChange={handleChange}
            value={applyJobDetails.githubProfile}
          />
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Work link 1</span>
          <input
            className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
            type="text"
            placeholder="You live working apps link or anything!"
            id="workLink1"
            name="workLink1"
            required
            onChange={handleChange}
            value={applyJobDetails.workLink1}
          />
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Work link 2</span>
          <input
            className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
            type="text"
            placeholder="You live working apps link or anything!"
            id="workLink2"
            name="workLink2"
            required
            onChange={handleChange}
            value={applyJobDetails.workLink2}
          />
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">
            Why you should be hired for this role?
          </span>
          <textarea
            className="bg-gray-100 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full text-black lg:flex-[3] "
            placeholder="About your achievements, your works!"
            rows={6}
            id="hiring"
            name="hiring"
            required
            onChange={handleChange}
            value={applyJobDetails.hiring}
          ></textarea>
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Your Availability?</span>
          <textarea
            className="bg-gray-100 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full text-black lg:flex-[3] "
            placeholder="For how much time, you will be available"
            rows={5}
            id="availability"
            name="availability"
            required
            onChange={handleChange}
            value={applyJobDetails.availability}
          ></textarea>
        </label>

        {currentUser?.user?.appliedJobs?.includes(currentJob?._id) ? (
          <div className="text-center">
            <button
              className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase
            rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base cursor-pointer"
            >
              You have already applied!
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={applyJob}
              type="button"
              disabled={loading}
              className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase
            rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base cursor-pointer disabled:cursor-not-allowed"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ApplyJobPage;
