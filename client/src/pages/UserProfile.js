import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import SingleJob from "../components/SingleJob";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const path = useLocation();
  const id = path.pathname.split("/")[2];

  const dispatch = useDispatch();

  const [updateDetails, setUpdateDetails] = useState({
    profilePicture: currentUser?.user?.profilePicture,
    about: currentUser?.user?.about,
    livesIn: currentUser?.user?.livesIn,
    worksAt: currentUser?.user?.worksAt,
    country: currentUser?.user?.country,
  });

  const handleChange = (e) => {
    setUpdateDetails({ ...updateDetails, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    dispatch(updateStart());
    try {
      const res = await axios.put(`/users/${id}`, {
        _id: currentUser?.user?._id,
        profilePicture: updateDetails.profilePicture,
        livesIn: updateDetails.livesIn,
        worksAt: updateDetails.worksAt,
        country: updateDetails.country,
        about: updateDetails.about,
      });
      dispatch(updateSuccess(res.data));
      toast.success("Profile Updated");
    } catch (error) {
      dispatch(updateFailure());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [jobsAppliedByUser, setJobsAppliedByUser] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `/users/${currentUser?.user?._id}/userAppliedJobs`
        );
        setJobsAppliedByUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [currentUser?.user?._id]);

  return (
    <div className="p-5 sm:px-8 flex flex-col gap-5">
      <div className="p-3 sm:p-5 text-white bg-[#1f1d27] rounded-lg min-h-max">
        <div className="flex justify-center items-center mb-5">
          <h1 className="font-bold text-base lg:text-xl text-center">
            Your Profile
          </h1>
          <img
            className="w-12 h-12 object-cover lg:w-14 lg:h-14 rounded-full ml-5"
            src={
              currentUser?.user?.profilePicture
                ? currentUser?.user?.profilePicture
                : "https://www.leedssalon.org.uk/wp-content/uploads/2019/09/generic_avatar.png"
            }
            alt=""
          />
        </div>

        <div>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">
              Username{" "}
              <p className="hidden lg:inline-block text-xs text-red-500">
                ( *Not changeable)
              </p>
            </span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder={currentUser?.user?.username}
              id="username"
              name="username"
              defaultValue={currentUser?.user?.username}
              readOnly
            />
            <div className="lg:hidden">
              <p className="text-red-500 text-sm">*Not changeable</p>
            </div>
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">
              Email{" "}
              <p className="hidden lg:inline-block text-xs text-red-500">
                ( *Not changeable)
              </p>
            </span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder={currentUser?.user?.email}
              id="email"
              name="email"
              defaultValue={currentUser?.user?.email}
              readOnly
            />
            <div className="lg:hidden">
              <p className="text-red-500 text-sm">*Not changeable</p>
            </div>
          </label>
          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">
              Profile Picture
            </span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Profile Picture URL"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
              value={updateDetails.profilePicture}
            />
          </label>

          <label className="block mb-5 md:mb-8 lg:flex lg:items-center">
            <span className="text-gray-200 lg:flex-1 lg:text-lg">Lives at</span>
            <input
              className="bg-gray-100 shadow border py-1 px-2 md:py-2 md:px-3 rounded form-input mt-1 block w-full text-black lg:flex-[3]"
              type="text"
              placeholder="Lives in"
              id="livesIn"
              name="livesIn"
              onChange={handleChange}
              value={updateDetails.livesIn}
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
              onChange={handleChange}
              value={updateDetails.worksAt}
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
              onChange={handleChange}
              value={updateDetails.country}
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
              onChange={handleChange}
              value={updateDetails.about}
            ></textarea>
          </label>
        </div>
        <div className="flex flex-col justify-center">
          <button
            type="button"
            className="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out max-w-sm mx-auto mt-4 sm:mt-8 lg:text-base"
            onClick={updateProfile}
          >
            Update Profile
          </button>
          <div className="text-xs text-gray-300">
            <p className="text-center">
              <span className="text-red-500">*Note</span> - Keep your profile
              always updated, because it will be shared with the companies you
              applied to!
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-5 text-white  rounded-lg h-max">
        <div className="flex justify-center items-center mb-5">
          <h1 className="font-bold text-base lg:text-xl text-center">
            Applied Companies
          </h1>
        </div>
        <div>
          {jobsAppliedByUser && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5 ">
                <SingleJob jobs={jobsAppliedByUser} />
              </div>
              <p className="text-center text-sm underline underline-offset-4  text-gray-200 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
                Applied in total {currentUser?.user?.appliedJobs?.length}{" "}
                companies
              </p>
            </div>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default UserProfile;
