import React from "react";
import MainContent from "./MainContent";
import LastSection from "../../LastSection";
import GetInTouch from "./GetInTouch";


const ShotsDescription = ({shot}) => {
  return (
    <div>
          <MainContent shot={shot} />
      <h2 className="text-gray-900 text-4xl md:text-6xl font-semibold font-['Source_Serif_4'] mb-8 text-center">
        More By Team Agency
      </h2>
      <LastSection />
          <GetInTouch
          />
    </div>
  );
};

export default ShotsDescription;
