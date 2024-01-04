import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <div className="z-[999] sticky top-0">
        <header className="flex justify-between p-4 sm:p-5 mx-auto items-center sticky top-0 bg-[#1f1d27] z-[99]">
          <div className="flex items-center space-x-5">
            <Link to="/">
              <div className="font-bold text-3xl lg:text-4xl text-white">
                Place<span className="text-green-600">U</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:inline-flex items-center space-x-5 text-white">
            <Link to="/about">
              <h3 className="cursor-pointer hover:underline">About</h3>
            </Link>
            <h3 className="cursor-pointer hover:underline">Contact</h3>
            <Link to="/">
              <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                JOBS
              </h3>
            </Link>
          </div>
          {currentUser ? (
            <div className=" hidden sm:flex items-center space-x-5 text-green-600">
              <Link to={`/user/${currentUser?.user?._id}`}>
                <h1 className="cursor-pointer">
                  {currentUser?.user?.username}
                </h1>
              </Link>
              <h3
                className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer "
                onClick={handleLogout}
              >
                Logout
              </h3>
              {currentUser?.user?.isAdmin && (
                <>
                  {/* <Link to="/addJob">
                    <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                      Add Jobs
                    </h3>
                  </Link> */}

                  <Link to={`/dashboard/${currentUser?.user?._id}`}>
                    <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                      Dashboard
                    </h3>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className=" hidden sm:flex items-center space-x-5 text-green-600">
              <Link to="/login">
                <h3 className="cursor-pointer">Sign In</h3>
              </Link>
              <Link to="/signup">
                <h3 className="border px-4 py-1 rounded-full border-green-600 cursor-pointer">
                  Get Started
                </h3>
              </Link>
            </div>
          )}

          {/* hamburger */}
          <div
            className="flex flex-col justify-between h-6 w-8 cursor-pointer md:hidden text-white"
            onClick={() => setOpen(!open)}
            style={{ zIndex: "99" }}
          >
            {open ? <ImCross size={35} /> : <GiHamburgerMenu size={35} />}
          </div>

          <ul
            onClick={() => setOpen(false)}
            className="fixed top-0  h-screen w-screen-1/2 bg-[#9e8f8f] font-bold text-black p-10 flex flex-col justify-around transition-all duration-500 ease-in-out"
            style={{ right: open ? "0px" : "-100vw" }}
          >
            <Link to="/about">
              <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                About
              </h3>
            </Link>
            <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
              Contact
            </h3>
            <Link to="/">
              <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                All Jobs
              </h3>
            </Link>

            {currentUser ? (
              <>
                <Link to={`/user/${currentUser?.user?._id}`}>
                  <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                    Profile
                  </h3>
                </Link>

                <h3
                  className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer "
                  onClick={handleLogout}
                >
                  Logout
                </h3>
              </>
            ) : (
              <>
                <Link to="/login">
                  <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                    Signin
                  </h3>
                </Link>
                <Link to="/signup">
                  <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                    Get Started
                  </h3>
                </Link>
              </>
            )}

            {currentUser?.user?.isAdmin && (
              <Link to={`/dashboard/${currentUser?.user?._id}`}>
                <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
                  Dashboard
                </h3>
              </Link>
              // <Link to="/addJob">
              //   <h3 className="text-white bg-green-600 px-6 py-1 rounded-full cursor-pointer ">
              //     Add Jobs
              //   </h3>
              // </Link>
            )}
          </ul>
        </header>
        <Toaster />
      </div>
    </>
  );
};

export default Navbar;
