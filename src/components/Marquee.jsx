// Marquee.jsx

import React from "react";

const Marquee = () => {
  return (
    <div className="bg-yellow-200 p-1">
      <marquee
        behavior="scroll"
        direction="left"
        className="text-lg text-blue-800"
      >
        Please provide the correct name of your nearest city for accurate data.
      </marquee>
    </div>
  );
};

export default Marquee;
