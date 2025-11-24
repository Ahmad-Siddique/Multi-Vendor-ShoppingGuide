import React, { Suspense } from "react";

import ShotsFilter from "../ShotsFilter";
import LastSection from "../../LastSection";
import ShotsDesign from "../ShotsDesign";

const AllShots = ({shots}) => {
  return (
    <div>
      <Suspense fallback={<div>Loading filters...</div>}>
        <ShotsFilter />

        {/* Check if shots array is empty */}
        {shots && shots.data.length > 0 ? (
          <>
            <ShotsDesign shots={shots} />
            
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] w-full px-4 sm:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 mb-4">
                No Shots Found
              </h2>
            
            </div>
          </div>
        )}
        <div className="h-32"></div>
        <LastSection />
      </Suspense>
    </div>
  );
};

export default AllShots;
