import React from "react";
import BlogDescription from "./BlogDescription";
import OtherBlogs from "./OtherBlogs";


const MainBlogDescription = ({ blog}) => {
  return (
    <div>
      <BlogDescription blog={blog} />
          <OtherBlogs blog={blog} />
    </div>
  );
};

export default MainBlogDescription;
