import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleJob = ({ jobs }) => {
  // console.log(jobs);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {jobs.map((job) => (
        <div
          className="hover:scale-105 hover:shadow-lg  hover:shadow-slate-700 z-10"
          key={job?._id}
        >
          <div className="flex justify-center bg-[#1f1d27] rounded-lg">
            <div className="rounded-lg shadow-lg ">
              <div className="flex justify-between p-3 text-gray-300">
                <img
                  className="rounded-lg w-15 h-12"
                  src={job?.mainImg}
                  alt=""
                />
                <h1 className="text-white font-bold ">{job?.companyName}</h1>
              </div>
              <div className="p-3 relative">
                <h5 className=" text-lg font-medium mb-1 text-white">
                  {job?.jobTitle}
                </h5>
                <p className="text-gray-300 text-sm mb-4">
                  {job?.desc?.slice(0, 120)}...
                </p>

                <Link to={`/jobPage/${job?._id}`}>
                  <button
                    type="button"
                    className="inline-block px-5 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Read more
                  </button>
                </Link>

                <div className="absolute right-3 bottom-3">
                  {job?.acceptedUsers?.includes(currentUser?.user?._id) && (
                    <span className="bg-green-400 px-2 py-1 rounded-full text-xs font-bold">
                      Accepted
                    </span>
                  )}

                  {job?.rejectedUsers?.includes(currentUser?.user?._id) && (
                    <span className="bg-red-400 px-2 py-1 rounded-full text-xs font-bold">
                      Rejected
                    </span>
                  )}

                  {/* {!job?.acceptedUsers?.includes(currentUser?.user?._id) &&
                    !job?.rejectedUsers?.includes(currentUser?.user?._id) && (
                      <span className="bg-yellow-500 px-2 py-1 rounded-full text-xs text-black">
                        Pending
                      </span>
                    )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleJob;
