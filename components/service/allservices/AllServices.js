import { Suspense } from "react";
import ServiceFilter from "../ServiceFilter";
import CarousalCategory from "../../useable/CarousalCategory";
import ServiceDesign from "../ServiceDesign";

const AllServices = ({services}) => {
  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 mt-6 text-center">
        All Services
      </h1>
      
      <Suspense fallback={<div>Loading filters...</div>}>
        <ServiceFilter />
      </Suspense>

      {/* Check if services array is empty */}
      {services && services.data && services.data.length > 0 ? (
        <>
          <ServiceDesign services={services} />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[200px] w-full px-4 sm:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 mb-4">
              No Services Found
            </h2>
          </div>
        </div>
      )}
      
      <CarousalCategory />
    </div>
  );
};

export default AllServices;
