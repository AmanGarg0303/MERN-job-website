import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img
        className="my-3"
        src={loading}
        alt="Loading"
        style={{ width: "35px" }}
      />
    </div>
  );
};

export default Spinner;
