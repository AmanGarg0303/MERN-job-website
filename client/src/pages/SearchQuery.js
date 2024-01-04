import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchAndFilter from "../components/SearchAndFilter";
import SingleJob from "../components/SingleJob";

const SearchQuery = () => {
  const [jobs, setJobs] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(`/jobs/getjobbysearch${query}`);
      setJobs(res.data);
    };
    fetchJobs();
  }, [query]);

  return (
    <>
      <div className="p-5 sm:px-8 text-white">
        <div className="flex flex-col lg:flex-row">
          <SearchAndFilter />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl-grid-cols-4 gap-3 md:gap-5 lg:flex-[3]">
            <SingleJob jobs={jobs} />
          </div>
        </div>
        <div className="text-center m-10">
          <p>Total Job Results: {jobs.length}</p>
        </div>
      </div>
    </>
  );
};

export default SearchQuery;
