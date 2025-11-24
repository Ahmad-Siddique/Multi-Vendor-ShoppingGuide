"use client";
import React from "react";

const BlogDescription = ({ blog }) => {
  // Defensive fallback
  if (!blog?.success || !blog?.data?.blog) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-8 py-6 flex justify-center">
        <div className="w-full max-w-[1440px] flex flex-col gap-10">
          <div className="w-full p-6 sm:p-10 bg-slate-50 rounded-[20px] flex flex-col gap-5">
            <div className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold font-['Inter']">
              Blog Not Found
            </div>
          </div>
        </div>
      </div>
    );
  }

  const b = blog.data.blog;

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6 flex justify-center">
      <div className="w-full max-w-[1440px] flex flex-col gap-10">
        <div className="w-full p-6 sm:p-10 bg-slate-50 rounded-[20px] flex flex-col gap-5">
          <div className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold font-['Inter']">
            {b.title}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-10 min-w-0">
            <div className="flex flex-col gap-5">
              <div className="text-zinc-400 text-xs sm:text-sm font-medium font-['Inter'] uppercase tracking-wide">
                {b.category}
                {" • "}
                {new Date(b.createdAt).toLocaleDateString()}
                {" • "}
                {b.views} views
              </div>
              <div className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-medium font-['Inter']">
                {b.title}
              </div>
            </div>
            <div className="p-3 sm:p-5 bg-gray-900 rounded-[40px] flex flex-col gap-2.5">
              <div className="w-full aspect-[16/7] relative rounded-[20px] overflow-hidden flex flex-col items-center justify-center">
                <img
                  className="w-full max-w-full h-auto rounded-[20px] object-cover"
                  src={b.image}
                  alt={b.title}
                />
              </div>
            </div>
            <div className="p-6 sm:p-10 bg-slate-50 rounded-[40px] flex flex-col gap-5">
              <div className="text-gray-900 text-2xl sm:text-3xl md:text-5xl font-bold font-['Inter']">
                About this Blog
              </div>
              <div
                className="text-gray-900 text-base sm:text-xl font-normal font-['Inter'] leading-8"
                dangerouslySetInnerHTML={{ __html: b.description }}
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {b.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:max-w-sm flex flex-col gap-10 flex-shrink-0">
            <div className="w-full p-6 sm:p-10 bg-slate-50 rounded-[20px] flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="text-gray-900 text-xl sm:text-2xl font-semibold font-['Inter']">
                  All Categories
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Interviews",
                    "Podcast",
                    "Inspiration",
                    "Process",
                    "Meetups",
                    "Updates",
                    "Hang Time",
                    "Community",
                  ].map((cat) => (
                    <a
                      key={cat}
                      href={`/blogs?category=${encodeURIComponent(cat)}`}
                      className="text-gray-900 text-base sm:text-xl font-normal font-['Inter'] cursor-pointer hover:underline"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDescription;
