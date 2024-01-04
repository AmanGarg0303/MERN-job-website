import React, { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminFilter = () => {
  const [open, setOpen] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [seniorityLevel, setSeniorityLevel] = useState(false);

  useEffect(() => {
    if (window.screen.availWidth >= "1024") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="lg:flex-1 lg:mr-4 lg:sticky lg:top-[75px]">
      <div className="flex relative lg:sticky lg:top-[131px]">
        <span>Admin Filter</span>
        <div
          className="flex flex-col justify-between h-6 w-8  cursor-pointer text-white"
          onClick={() => setOpen(!open)}
          style={{ zIndex: "99" }}
        >
          {open ? <AiFillCaretDown size={35} /> : <AiFillCaretUp size={35} />}
        </div>
        <div
          //   onClick={() => setEmployment(false)}
          className="absolute w-full bg-purple-200 font-bold text-black py-2 px-4 flex flex-col justify-around rounded-lg transition-all duration-500 ease-in-out max-w-md z-20"
          style={{
            top: open ? "24px" : "100vh",
            display: open ? "inline" : "none",
            transition: "ease-out",
          }}
        >
          <div className="flex flex-col text-gray-800 text-sm">
            <div
              className="flex items-center justify-between"
              onClick={() => setEmployment(!employment)}
            >
              <span className="text-sm text-black cursor-pointer">Jobs</span>
              <div
                className="flex flex-col justify-between h-6 w-8 cursor-pointer "
                onClick={() => setEmployment(!employment)}
                style={{ zIndex: "99" }}
              >
                {employment ? (
                  <AiFillCaretUp size={25} />
                ) : (
                  <AiFillCaretDown size={25} />
                )}
              </div>
            </div>
            <div
              className="flex flex-col font-semibold"
              style={{ display: employment ? "none" : "flex" }}
            >
              <hr className="mx-4 my-2 border-green-500" />
              <Link
                to={`/dashboard/${currentUser?.user?._id}`}
                className="py-1"
              >
                <label className="py-1">
                  <span className="ml-5 cursor-pointer">Posted Jobs</span>
                </label>
              </Link>
              <Link to="/addJob" className="py-1">
                <label className="py-1">
                  <span className="ml-5 cursor-pointer">Add jobs</span>
                </label>
              </Link>
            </div>
          </div>
          <div className="flex flex-col text-gray-800 text-sm my-2">
            <div
              className="flex items-center justify-between"
              onClick={() => setSeniorityLevel(!seniorityLevel)}
            >
              <span className="text-sm text-black cursor-pointer">Users</span>
              <div
                className="flex flex-col justify-between h-6 w-8 cursor-pointer "
                onClick={() => setSeniorityLevel(!seniorityLevel)}
                style={{ zIndex: "99" }}
              >
                {seniorityLevel ? (
                  <AiFillCaretUp size={25} />
                ) : (
                  <AiFillCaretDown size={25} />
                )}
              </div>
            </div>
            <div
              className="flex flex-col font-semibold"
              style={{ display: seniorityLevel ? "none" : "flex" }}
            >
              <hr className="mx-4 my-2 border-green-500" />
              <Link
                to={`/alljobsbyadmin/${currentUser?.user?._id}`}
                className="py-1"
              >
                <label className="py-1">
                  <span className="ml-5 cursor-pointer">User applied jobs</span>
                </label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;
