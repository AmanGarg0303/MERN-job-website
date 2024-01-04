import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const UserAppliedJobs = () => {
  const path = useLocation();
  const pathname = path.pathname.split("/")[2];

  const [jobspostedbyadmin, setJobspostedbyadmin] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(`/jobs/${pathname}/jobs`);
        setJobspostedbyadmin(res.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pathname]);

  return (
    <div className="p-4 sm:px-8 sm:py-5">
      <div className="p-3 sm:p-5 text-white  rounded-lg min-h-[70vh]">
        <h1 className="font-bold mb-5 text-base lg:text-xl text-center">
          Users applied to your posted jobs
        </h1>
        <div>
          {jobspostedbyadmin.map((j) => (
            <div key={j._id}>
              <Link to={`/users/${j._id}/${currentUser?.user?._id}`}>
                <div className="bg-[#1f1d27] mb-5 p-5 rounded-lg" key={j._id}>
                  {j?.jobTitle} at {j?.companyName}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAppliedJobs;
