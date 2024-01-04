import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserAppliedJob = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentJob } = useSelector((state) => state.job);

  //Page should be at top, whenever loaded
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, []);

  const [appliedjobuserdata, setAppliedjobuserdata] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `/users/${currentJob?._id}/${currentUser?.user?._id}/userdata`
        );
        setAppliedjobuserdata(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [currentJob?._id, currentUser?.user?._id]);

  return (
    <div className="p-5 sm:px-8">
      <div className="p-3 sm:p-5 text-white bg-[#1f1d27] rounded-lg min-h-screen">
        <h1 className="font-bold mb-5 text-base lg:text-xl text-center">
          Applied for {currentJob?.jobTitle} at {currentJob?.companyName}
        </h1>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Github Profile</span>
          <input
            className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
            type="text"
            defaultValue={appliedjobuserdata?.githubProfile}
            readOnly
          />
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Work Link 1</span>
          <input
            className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
            type="text"
            defaultValue={appliedjobuserdata?.workLink1}
            readOnly
          />
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Work Link 2</span>
          <input
            className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
            type="text"
            defaultValue={appliedjobuserdata?.workLink2}
            readOnly
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
            value={appliedjobuserdata?.hiring}
            readOnly
          ></textarea>
        </label>
        <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
          <span className="text-gray-200 lg:flex-1">Your availability?</span>
          <textarea
            className="bg-gray-100 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full text-black lg:flex-[3] "
            placeholder="About your achievements, your works!"
            rows={6}
            value={appliedjobuserdata?.availability}
            readOnly
          ></textarea>
        </label>
        <h1 className="font-normal text-gray-200 my-5 text-base text-center">
          Application submitted on{" "}
          {new Date(appliedjobuserdata?.createdAt).toDateString()}
        </h1>
      </div>
    </div>
  );
};

export default UserAppliedJob;
