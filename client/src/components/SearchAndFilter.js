import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchAndFilter = () => {
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

  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/getjobbysearch?q=${q}`);
    }
  };

  return (
    <div className="lg:flex-1 lg:mr-4 lg:sticky lg:top-[75px]">
      <div className="bg-gray-200 flex flex-row justify-center items-center my-2 py-1 px-2 rounded lg:sticky lg:top-[90px]">
        <input
          className=" bg-gray-200 py-1 px-2 w-full outline-none text-black"
          type="text"
          placeholder="Search jobs"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className="text-gray-400 text-xl cursor-pointer"
          onClick={() => navigate(`/getjobbysearch?q=${q}`)}
        />
      </div>

      <div className="flex relative lg:sticky lg:top-[131px]">
        <span>Filters</span>
        <div
          className="flex flex-col justify-between h-6 w-8 lg:hidden cursor-pointer text-white"
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
              <span className="text-sm text-black">Types of Employment</span>
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
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=frontend`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">Frontend Developer</span>
              </label>
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=backend`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">Backend Developer</span>
              </label>
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=full stack`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">Full Stack Developer</span>
              </label>
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=android`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">Android Developer</span>
              </label>
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=developer`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">Developer Jobs</span>
              </label>
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=product`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">Product Manager</span>
              </label>
              <label
                className="py-1"
                onClick={() => navigate(`/getjobbysearch?q=hr`)}
              >
                <input type="radio" name="searchQuery" id="" />
                <span className="ml-5">HR Jobs</span>
              </label>
            </div>
          </div>
          {/* <div className="flex flex-col text-gray-800 text-sm my-2">
            <div
              className="flex items-center justify-between"
              onClick={() => setSeniorityLevel(!seniorityLevel)}
            >
              <span className="text-sm text-black">Types of Level</span>
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
              <label className="py-1">
                <input type="checkbox" name="" id="" />
                <span className="ml-5">Student</span>
              </label>
              <label className="py-1">
                <input type="checkbox" name="" id="" />
                <span className="ml-5">Junior</span>
              </label>
              <label className="py-1">
                <input type="checkbox" name="" id="" />
                <span className="ml-5">Entry Level</span>
              </label>
              <label className="py-1">
                <input type="checkbox" name="" id="" />
                <span className="ml-5">Fresher</span>
              </label>
              <label className="py-1">
                <input type="checkbox" name="" id="" />
                <span className="ml-5">Directors</span>
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
