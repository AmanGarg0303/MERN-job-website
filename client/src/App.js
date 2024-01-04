import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobPage from "./pages/JobPage";
import AddJob from "./pages/AddJob";
import SearchQuery from "./pages/SearchQuery";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import ApplyJobPage from "./pages/ApplyJobPage";
import UserAppliedJob from "./pages/UserAppliedJob";
import AdminHome from "./dashboard/AdminHome";
import UserAppliedJobs from "./dashboard/UserAppliedJobs";
import UserData from "./dashboard/UserData";
import UserProfileAdmin from "./dashboard/UserProfileAdmin";
import UserP from "./dashboard/UserP";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        <div className="bg-[#13121c] min-h-screen">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/login"
              element={currentUser === null ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={currentUser === null ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/jobPage/:id" element={<JobPage />} />
            {/* <Route path="/addJob" element={<AddJob />} /> */}
            <Route path="/getjobbysearch" element={<SearchQuery />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/applyJob/:id" element={<ApplyJobPage />} />
            <Route
              path="userAppliedJobPage/:jobId/:userId"
              element={<UserAppliedJob />}
            />
            ({/* dashboard routes  */}
            {currentUser?.user?.isAdmin && (
              <>
                <Route path="/dashboard/:id" element={<AdminHome />} />
                <Route path="/addJob" element={<AddJob />} />
                <Route
                  path="/alljobsbyadmin/:id"
                  element={<UserAppliedJobs />}
                />
                <Route path="/users/:jobId/:userId" element={<UserData />} />
                <Route
                  path="/userpro/:jobId/:userId"
                  element={<UserProfileAdmin />}
                />
                <Route path="/userp/:id" element={<UserP />} />)
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
