import { useState, useEffect } from "react";
import AllJobs from "../components/AllJobs";
import SearchAndFilter from "../components/SearchAndFilter";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  // const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   const fetchallJobs = async () => {
  //     try {
  //       const jobsRes = await axios.get(`/jobs/getalljobs`);
  //       setJobs(jobsRes.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchallJobs();
  // }, []);

  const { currentUser } = useSelector((state) => state.user);
  const [notAppliedJobs, setNotAppliedJobs] = useState([]);

  //show only those jobs to homepage to which user hasn't applied
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/jobs/usernotappliedjobs/${currentUser?.user?._id}`
        );
        setNotAppliedJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser?.user?._id]);

  return (
    <div className="p-5 sm:px-8 text-white">
      <div className="flex flex-col lg:flex-row">
        <SearchAndFilter />
        <AllJobs jobs={notAppliedJobs} />
      </div>
      <div className="text-center m-10">
        <p>Total Job Results: {notAppliedJobs.length}</p>
      </div>
    </div>
  );
};

export default Home;
