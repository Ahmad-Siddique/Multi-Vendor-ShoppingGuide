import TrendingDesigns from "../../featured-shots";
import CarousalCategory from "../../useable/CarousalCategory";
import BlogDesign from "../BlogDesign";

const AllBlogs = ({blogs}) => {
  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 mt-6 text-center">
        All Blogs
      </h1>
      
      {/* Check if blogs array is empty */}
      {blogs && blogs.data.length > 0 ? (
        <>
          <BlogDesign blogs={blogs} />
          
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[200px] w-full">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 mb-4">
              No Blogs Found
            </h2>
           
          </div>
        </div>
      )}
      <CarousalCategory />
    </div>
  );
};

export default AllBlogs;
