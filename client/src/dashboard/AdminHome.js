import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import SingleJob from "../components/SingleJob";
import AdminFilter from "./AdminFilter";
import { useSelector } from "react-redux";
import Charts from "./Charts";

const AdminHome = () => {
  const path = useLocation();
  const pathname = path.pathname.split("/")[2];

  const { currentUser } = useSelector((state) => state.user);

  const [jobspostedbyadmin, setJobspostedbyadmin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/jobs/${pathname}/jobs`);
      setJobspostedbyadmin(res.data);
    };
    fetchData();
  }, [pathname]);

  //Page should be at top, whenever loaded
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, [pathname]);

  //chart data
  const [chartData, setChartData] = useState([
    { name: "Jan", Total: 0 },
    { name: "Feb", Total: 0 },
    { name: "Mar", Total: 0 },
    { name: "Apr", Total: 0 },
    { name: "May", Total: 0 },
    { name: "Jun", Total: 0 },
    { name: "Jul", Total: 0 },
    { name: "Aug", Total: 0 },
    { name: "Sep", Total: 0 },
    { name: "Oct", Total: 0 },
    { name: "Nov", Total: 0 },
    { name: "Dec", Total: 0 },
  ]);
  useEffect(() => {
    let idArr = [];
    let totalArr = [];
    try {
      const fetchData = async () => {
        const res = await axios.get(`/jobs/stats/${pathname}`);
        for (const dataObj of res.data) {
          idArr.push(dataObj._id);
          totalArr.push(dataObj.total);
        }
        // console.log(idArr);
        // console.log(totalArr);
        setChartData([
          {
            name: "Jan",
            Total: idArr.map((i) => (i === 1 ? totalArr[idArr.indexOf(1)] : 0)),
          },
          {
            name: "Feb",
            Total: idArr.map((i) => (i === 2 ? totalArr[idArr.indexOf(2)] : 0)),
          },
          {
            name: "Mar",
            Total: idArr.map((i) => (i === 3 ? totalArr[idArr.indexOf(3)] : 0)),
          },
          {
            name: "Apr",
            Total: idArr.map((i) => (i === 4 ? totalArr[idArr.indexOf(4)] : 0)),
          },
          {
            name: "May",
            Total: idArr.map((i) => (i === 5 ? totalArr[idArr.indexOf(5)] : 0)),
          },
          {
            name: "Jun",
            Total: idArr.map((i) => (i === 6 ? totalArr[idArr.indexOf(6)] : 0)),
          },
          {
            name: "Jul",
            Total: idArr.map((i) => (i === 7 ? totalArr[idArr.indexOf(7)] : 0)),
          },
          {
            name: "Aug",
            Total: idArr.map((i) => (i === 8 ? totalArr[idArr.indexOf(8)] : 0)),
          },
          {
            name: "Sep",
            Total: idArr.map((i) => (i === 9 ? totalArr[idArr.indexOf(9)] : 0)),
          },
          {
            name: "Oct",
            Total: idArr.map((i) =>
              i === 10 ? totalArr[idArr.indexOf(10)] : 0
            ),
          },
          {
            name: "Nov",
            Total: idArr.map((i) =>
              i === 11 ? totalArr[idArr.indexOf(11)] : 0
            ),
          },
          {
            name: "Dec",
            Total: idArr.map((i) =>
              i === 12 ? totalArr[idArr.indexOf(12)] : 0
            ),
          },
        ]);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pathname]);
  // console.log(chartData);

  return (
    <div className="p-4 sm:px-8 sm:py-5">
      <div className="p-3 sm:p-5 text-white  rounded-lg min-h-[60vh]">
        <h1 className="font-bold mb-5 text-base lg:text-xl text-center">
          Admin Dashboard
        </h1>

        <div className="flex flex-col lg:flex-row">
          <AdminFilter />
          <div className="flex gap-5 py-5 px-1 lg:hidden">
            <Charts
              title="Jobs Posted (Last 1 year)"
              aspect={2 / 1}
              chartData={chartData}
            />
          </div>

          <h1 className="text-center mt-5 mb-3 lg:hidden">Your Posted Jobs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl-grid-cols-4 gap-3 md:gap-5 lg:flex-[3]">
            <SingleJob jobs={jobspostedbyadmin} />
          </div>
        </div>
        <div className="text-center m-10">
          <p>Jobs posted by you - {jobspostedbyadmin?.length}</p>
        </div>
      </div>

      <Link to={`/alljobsbyadmin/${currentUser?.user?._id}`} className="py-1">
        <div className=" p-3 sm:p-5 text-white bg-[#123456] rounded-lg">
          <h1 className="text-center">See users applied to your posted jobs</h1>
        </div>
        <div className=" hidden lg:flex gap-5 py-5 px-36">
          <Charts
            title="Jobs Posted (Last 1 year)"
            aspect={3 / 1}
            chartData={chartData}
          />
        </div>
      </Link>
    </div>
  );
};

export default AdminHome;
