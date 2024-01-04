import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      toast.success("Signup successful");
      setLoading(false);
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      setError(error?.response?.data?.message);
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[89vh] p-8 text-center flex justify-center items-center ">
        <main className="border p-5 shadow-2xl rounded-lg flex max-w-fit bg-[#e5e5e5]">
          {/* left div  */}
          <div>
            <div className="flex flex-col justify-center">
              <p className="text-green-600 font-bold ">
                Place<span className="text-black">U</span>
              </p>
              <h2 className="text-2xl mb-2 font-bold text-green-600 my-4 ">
                Sign in to Account
              </h2>
              <hr className="border border-green-600 inline-block mb-2" />
            </div>
            <div className="flex justify-center my-2 gap-2">
              <Link
                to="#"
                className="border-2 border-gray-500 p-2 rounded-full hover:bg-green-400"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link
                to="#"
                className="border-2 border-gray-500 p-2 rounded-full hover:bg-green-400"
              >
                <FaGoogle className="text-sm" />
              </Link>
              <Link
                to="#"
                className="border-2 border-gray-500 p-2 rounded-full hover:bg-green-400"
              >
                <FaLinkedinIn className="text-sm" />
              </Link>
            </div>
            <p className="text-sm mb-2 text-gray-400 my-4">
              or use your email account
            </p>

            <hr className="py-2 mx-4 my-2 border-green-500" />
            <form
              className="flex flex-col max-w-2xl mx-auto mb-5"
              onSubmit={handleRegister}
            >
              <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
                <BsFillPersonFill className="text-gray-400 text-xl" />
                <input
                  className=" bg-gray-100 py-2 px-3 w-full outline-none"
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
                <FaRegEnvelope className="text-gray-400 text-xl" />
                <input
                  className=" bg-gray-100 py-2 px-3 w-full outline-none"
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="bg-gray-100 flex flex-row justify-center items-center my-2 py-1.5 px-2 rounded">
                <MdLockOutline className="text-gray-400 text-xl" />
                <input
                  className=" bg-gray-100 py-2 px-3 w-full outline-none"
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-xs text-red-500 text-left mt-1 mb-2">*{error}</p>
              )}

              <button
                type="submit"
                className="shadow bg-green-400 border-2 hover:bg-transparent hover:text-green-600 hover:border-2 border-green-500
          text-white font-bold py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed"
                disabled={loading}
              >
                Register
              </button>
            </form>
            <Link to="/login" className="text-sm text-gray-500">
              Already have an account!
              <span className="text-green-600 font-semibold"> Login</span>
            </Link>
          </div>

          {/* right div  */}
          <div
            className="hidden sm:flex flex-col justify-center p-5 max-w-[12rem] bg-green-600 text-white
          rounded-tr-2xl rounded-br-2xl ml-5"
          >
            <h2 className="text-2xl mb-2 font-bold">Hello, Friend!</h2>
            <div className="border border-white inline-block mb-2"></div>
            <p className="text-sm mb-2">
              New User! Hakuna Matata.. We'll find you the perfect internships
              and jobs.
            </p>
          </div>
        </main>
        <Toaster />
      </div>
    </>
  );
}
