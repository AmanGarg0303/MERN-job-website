import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SearchAndFilter from "../components/SearchAndFilter";
import { fetchStart, fetchSuccess, fetchFailure } from "../redux/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import AdminFilter from "../dashboard/AdminFilter";

const JobPage = () => {
  const path = useLocation();
  const pathname = path.pathname.split("/")[2];

  const [job, setJob] = useState({});

  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { currentJob } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setLoading(true);
      dispatch(fetchStart());
      const fetchJob = async () => {
        const res = await axios.get(`/jobs/getjob/${pathname}`);
        dispatch(fetchSuccess(res.data));
        setJob(res.data);
        setLoading(false);
      };
      fetchJob();
    } catch (error) {
      setLoading(false);
      dispatch(fetchFailure());
    }
  }, [pathname, dispatch]);

  //Page should be at top, whenever loaded
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, [pathname]);

  return (
    <div className="p-5 sm:px-8 text-white">
      <div className="flex flex-col lg:flex-row">
        {currentUser?.user?.isAdmin ? (
          <div className="hidden lg:inline-flex lg:flex-1">
            <AdminFilter />
          </div>
        ) : (
          <div className="hidden lg:inline-flex">
            <SearchAndFilter />
          </div>
        )}

        <div className="min-h-[100vh] flex-[3] bg-[#1f1d27] p-3 rounded-lg ">
          <img
            className={`rounded-lg h-36 w-full sm:h-48 object-cover bg-gray-700 ${
              loading && "animate-pulse"
            } `}
            src={job?.coverImg}
            alt=""
          />
          <div className="relative">
            <img
              src={job?.mainImg}
              alt=""
              className="absolute w-16 h-14 object-cover left-3 -top-[67px] border rounded-lg"
            />
            <div className="absolute w-max h-max left-3 -top-[140px] sm:-top-[185px] border bg-[#1f1d27] px-2 rounded-lg text-sm lg:text-base">
              {job?.companyName}
            </div>
          </div>
          <div className="py-2">
            <h1 className="font-bold text-xl text-center py-1 md:text-2xl">
              {job?.jobTitle}
            </h1>

            <div className="flex justify-between">
              <div>
                <h3 className="mt-4">Job Location</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {job?.location}
                </p>
              </div>
              <div>
                <h3 className="mt-4">Job Posted</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {new Date(job?.createdAt).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="md:text-lg mt-4">Overview</h3>
              <p className="text-gray-300 text-sm md:text-base">{job?.desc}</p>
              <h3 className="mt-4">Day to day Duties</h3>
              <p className="text-gray-300 text-sm md:text-base">
                {job?.duties}
              </p>

              <div className="border my-8 sm:my-10 px-2 grid grid-cols-2 sm:grid-cols-4 md:mx-10 lg:mx-24 xl:mx-36 text-center rounded-3xl">
                <div className="flex flex-col justify-evenly my-2">
                  <h1 className="">Experience</h1>
                  <p className="text-gray-300">{job?.experience}</p>
                </div>
                <div className="flex flex-col justify-evenly my-2">
                  <h1 className="">Work Level</h1>
                  <p className="text-gray-300">{job?.workLevel}</p>
                </div>

                <div className="flex flex-col justify-evenly my-2">
                  <h1 className="">Employee Type</h1>
                  <p className="text-gray-300">{job?.employeeType}</p>
                </div>
                <div className="flex flex-col justify-evenly my-2">
                  <h1 className="">Salary</h1>
                  <p className="text-gray-300">{job?.salary}</p>
                </div>
              </div>

              <div>
                <h3 className="md:text-lg my-2">Requirements</h3>
                <div className="flex flex-wrap text-gray-200">
                  {job?.requirements?.map((r, i) => (
                    <div
                      className="px-3 py-1 border border-gray-500 rounded-xl mr-2 mb-2"
                      key={i}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="md:text-lg my-2">Perks</h3>
                <div className="flex flex-wrap text-gray-200">
                  {job?.perks?.map((perk, i) => (
                    <div
                      className="px-3 py-1 border border-gray-500 rounded-xl mr-2 mb-2"
                      key={i}
                    >
                      {perk}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="md:text-lg mt-4">Job Applicants</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {currentJob?.appliedBy?.length}
                </p>
              </div>

              {!currentUser ? (
                <Link to="/login" className="flex justify-center">
                  <button
                    type="button"
                    className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase 
                    rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base"
                  >
                    Login or Signup to apply
                  </button>
                </Link>
              ) : currentUser?.user?.appliedJobs?.includes(currentJob?._id) ? (
                <div className="text-center">
                  <Link
                    to={`/userAppliedJobPage/${pathname}/${currentUser?.user?._id}`}
                  >
                    <button
                      className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase
                    rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base cursor-pointer"
                    >
                      You have already applied! <br /> Review application
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to={`/applyJob/${pathname}`} className="text-center">
                    <button
                      type="button"
                      className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase
                    rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base"
                    >
                      Apply Now
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
