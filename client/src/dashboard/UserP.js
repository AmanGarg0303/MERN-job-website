import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserP = () => {
  const path = useLocation();
  const id = path.pathname.split("/")[2];

  const [userprofiledata, setUserprofiledata] = useState({});
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(`/users/${id}`);
        setUserprofiledata(res.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div className="p-5 sm:px-8 flex flex-col gap-5">
      <div className="p-3 sm:p-5 text-white bg-[#1f1d27] rounded-lg min-h-max">
        <div className="flex justify-center items-center mb-5">
          <h1 className="font-bold text-base lg:text-xl text-center">
            User Profile
          </h1>
          <img
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full ml-5"
            src={userprofiledata?.profilePicture}
            alt=""
          />
        </div>

        <div>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">Username</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              id="username"
              name="username"
              defaultValue={userprofiledata?.username}
              readOnly
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">Email</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              id="email"
              name="email"
              defaultValue={userprofiledata?.email}
              readOnly
            />
          </label>
          {/* <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">
              Profile Picture
            </span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Profile Picture URL"
              id="profilePicture"
              name="profilePicture"
              readOnly
              //   value={updateDetails.profilePicture}
            />
          </label> */}

          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">Lives at</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Lives in"
              id="livesIn"
              name="livesIn"
              readOnly
              defaultValue={userprofiledata?.livesIn}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">Works at</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Works at"
              id="worksAt"
              name="worksAt"
              readOnly
              defaultValue={userprofiledata?.worksAt}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">Country</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Country"
              id="country"
              name="country"
              readOnly
              defaultValue={userprofiledata?.country}
            />
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">About</span>
            <textarea
              className="bg-gray-100 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full text-black lg:flex-[3] "
              placeholder="About yourself, your achievements"
              rows={5}
              id="about"
              name="about"
              readOnly
              defaultValue={userprofiledata?.about}
            ></textarea>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserP;
