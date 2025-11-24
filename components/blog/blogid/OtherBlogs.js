import React from "react";
import Link from "next/link";

const OtherBlogs = ({ blog }) => {
  const relevantBlogs = blog?.data?.relevantBlogs || [];

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-24 flex flex-col justify-start items-start gap-10 max-w-screen-2xl mx-auto">
      <div className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold font-['Inter']">
        More Blogs
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-10">
        {relevantBlogs.map((b, idx) => (
          <Link
            key={b._id || idx}
            href={`/blogs/view/${b.slug}`}
            className="w-full"
            style={{ textDecoration: "none" }}
          >
            <div className="w-full p-6 md:p-10 bg-white rounded-[20px] shadow-[0px_0px_14px_0px_rgba(13,12,34,0.13)] flex flex-col md:flex-row justify-start items-start md:items-center gap-6 md:gap-12 cursor-pointer transition hover:shadow-lg">
              <div className="w-full md:w-72 h-60 md:h-72 rounded-[10px] flex justify-center items-center overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-[10px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.40)]"
                  src={b.image || "https://placehold.co/386x334"}
                  alt={b.title}
                />
              </div>
              <div className="flex-1 flex flex-col justify-start items-start gap-5">
                <div className="text-neutral-600 text-sm md:text-xl font-medium font-['Inter'] uppercase">
                  {b.category} •{" "}
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : ""}
                </div>
                <div className="text-gray-900 text-xl md:text-2xl font-semibold font-['Inter']">
                  {b.title}
                </div>
                <div className="text-zinc-500 text-base md:text-xl font-normal font-['Inter'] leading-relaxed md:leading-9 line-clamp-3">
                  {/* Show a short description if available, fallback to tags */}
                  {b.description
                    ? b.description.replace(/<[^>]+>/g, "").slice(0, 180) +
                      (b.description.length > 180 ? "..." : "")
                    : b.tags?.join(", ") || ""}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherBlogs;
