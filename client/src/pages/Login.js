import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      toast.success("Logged in successfully");
      navigate("/");
      setLoading(false);
    } catch (error) {
      dispatch(loginFailure());
      setError(error?.response?.data);
      console.log(error);
      toast.error("Something went wrong!");
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
              <p className="text-green-600 font-bold text-center">
                Place<span className="text-black">U</span>
              </p>
              <h2 className="text-2xl mb-2 font-bold text-green-600 my-4 text-center">
                Login in to Account
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
            <p className="text-sm mb-2 text-gray-400 my-4 text-center">
              or use your email account
            </p>

            <hr className="py-2 mx-4 my-2 border-green-500" />
            <form className="flex flex-col max-w-2xl mx-auto mb-5">
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

              <div className="flex flex-col">
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
                  <p className="text-xs text-red-500 text-left">*{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="shadow bg-green-400 border-2 hover:bg-transparent hover:text-green-600 hover:border-2 border-green-500
          text-white font-bold py-2 px-4 rounded cursor-pointer mt-4 disabled:cursor-not-allowed "
                onClick={handleLogin}
                disabled={loading}
              >
                Login
              </button>
            </form>
            <Link to="/signup" className="text-sm text-gray-500">
              Don't have an account!
              <span className="text-green-600 font-semibold"> Signup</span>
            </Link>
          </div>

          {/* right div  */}
          <div
            className="hidden sm:inline-flex flex-col p-5 max-w-[12rem] bg-green-600 text-white
          rounded-tr-2xl rounded-br-2xl py-36 px-12 ml-5"
          >
            <h2 className="text-2xl mb-2 font-bold">Hello, Friend!</h2>
            <div className="border border-white inline-block mb-2"></div>
            <p className="text-sm mb-2">
              Fill up personal information and apply to best companies.
            </p>
          </div>
        </main>
        <Toaster />
      </div>
    </>
  );
}
