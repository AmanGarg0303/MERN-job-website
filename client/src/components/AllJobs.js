import SingleJob from "./SingleJob";

const AllJobs = ({ jobs }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl-grid-cols-4 gap-3 md:gap-5 lg:flex-[3]">
        <SingleJob jobs={jobs} />
      </div>
    </>
  );
};

export default AllJobs;
