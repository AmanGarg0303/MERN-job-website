import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsClipboardData } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import { RiDeleteBin5Fill } from "react-icons/ri";
// import toast, { Toaster } from "react-hot-toast";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  acceptUserToJob,
  rejectUserToJob,
} from "../redux/jobSlice";
import { useSelector, useDispatch } from "react-redux";

const UserData = () => {
  const [userProfile, setUserProfile] = useState([]);

  const path = useLocation();
  const pathname = path.pathname.split("/")[2]; //it has jobId

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`/jobs/${pathname}/appliedusersofjob`);
        setUserProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, [pathname]);
  // console.log(userProfile);

  const [jobName, setJobName] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/jobs/getjob/${pathname}`);
        setJobName(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pathname]);
  // console.log(jobName);

  const { currentJob } = useSelector((state) => state.job);

  //setting up current job
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(fetchStart());
      const fetchJob = async () => {
        const res = await axios.get(`/jobs/getjob/${pathname}`);
        dispatch(fetchSuccess(res.data));
      };
      fetchJob();
    } catch (error) {
      dispatch(fetchFailure());
    }
  }, [pathname, dispatch]);

  return (
    <div className="p-4 sm:px-8 sm:py-5">
      <div className="p-3 sm:p-5 text-white  rounded-lg min-h-[60vh]">
        <h1 className="font-bold mb-5 text-base lg:text-xl text-center">
          Users of {jobName?.jobTitle} at {jobName?.companyName} ({" "}
          {userProfile?.length} )
        </h1>

        {userProfile?.length === 0 && (
          <p className="text-gray-300 flex justify-center mt-20">
            None has applied to it yet!
          </p>
        )}
        {userProfile.map((u) => (
          <div className="bg-[#1f1d27] mb-5 p-5 rounded-lg" key={u.userId}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                Username - {u?.username}
                <div className="flex justify-center items-center">
                  {
                    <TiTickOutline
                      size={20}
                      color="green"
                      className="cursor-pointer"
                      onClick={async () => {
                        try {
                          const res = await axios.put(
                            `/users/accept/${pathname}`,
                            {
                              userId: u.userId,
                            }
                          );
                          dispatch(acceptUserToJob(u.userId));
                          console.log(res.data);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    />
                  }
                  {currentJob?.acceptedUsers?.includes(u.userId) && (
                    <div className="bg-green-500 px-1 py-1 text-xs rounded-lg">
                      Accepted
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                Email - {u?.email}
                <div className="flex justify-center items-center">
                  <RiDeleteBin5Fill
                    size={20}
                    color="red"
                    className="cursor-pointer"
                    onClick={async () => {
                      try {
                        const res = await axios.put(
                          `/users/reject/${pathname}`,
                          {
                            userId: u.userId,
                          }
                        );
                        dispatch(rejectUserToJob(u.userId));
                        // setRejectUser(!rejectUser);
                        console.log(res.data);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                  {currentJob?.rejectedUsers?.includes(u.userId) && (
                    <div className="bg-red-500 px-1 py-1 rounded-lg text-xs">
                      Rejected
                    </div>
                  )}
                </div>
              </div>
              <Link to={`/userp/${u.userId}`}>
                <div className="flex justify-between items-center">
                  User profile
                  <CgProfile size={20} />
                </div>
              </Link>
              <Link to={`/userpro/${pathname}/${u.userId}`}>
                <div className="flex justify-between items-center">
                  User submitted data
                  <BsClipboardData size={20} />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserData;
