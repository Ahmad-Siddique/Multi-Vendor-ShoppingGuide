import React, { Suspense } from "react";
import ShotsFilter from "../shots/ShotsFilter";
import ShotsDesign from "../shots/ShotsDesign";
import ShotsFilterHome from "./ShotsFilterHome";

const ShotsSection = ({ shots }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading filters...</div>}>
        {/* <ShotsFilter /> */}

        <ShotsDesign shots={shots} />
       
      </Suspense>
    </div>
  );
};

export default ShotsSection;
