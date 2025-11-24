"use client";
import React from "react";
import { useState } from "react";

// SVG Icons
const LikeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      d="M16.5 3.5c-1.74 0-3.41 1.01-4.5 2.09C10.91 4.51 9.24 3.5 7.5 3.5A5.505 5.505 0 0 0 2 9c0 7.08 10 11.5 10 11.5s10-4.42 10-11.5a5.505 5.505 0 0 0-5.5-5.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-5-7 5V5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const MainContent = ({ shot }) => {
  if (!shot?.success || !shot?.data) {
    return (
      <div className="w-full pt-0 pb-8 md:pb-16 px-4 sm:px-6 lg:px-16 flex flex-col gap-12 max-w-[1440px] mx-auto">
        <div className="w-full px-4 sm:px-8 py-6 md:py-10 bg-slate-50 rounded-2xl flex flex-col gap-5">
          <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Inter'] leading-tight">
            Shot Not Found
          </h1>
        </div>
      </div>
    );
  }

  const s = shot.data;
  const [likes, setLikes] = useState(s.likes || 0);
  const [liking, setLiking] = useState(false);

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    const prevLikes = likes;
    setLikes((l) => l + 1);
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shots/${s._id}/like`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to like the shot");
      const data = await response.json();
      setLikes(data.likes); // In case backend returns a different value
    } catch (error) {
      console.error('Like error:', error);
      alert("Error liking the shot");
      setLikes(prevLikes); // Revert on error
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="w-full pt-0 pb-8 md:pb-16 px-4 sm:px-6 lg:px-16 flex flex-col gap-12 max-w-[1440px] mx-auto">
      {/* Header Section */}
      <div className="w-full px-4 sm:px-8 py-6 md:py-10 bg-slate-50 rounded-2xl flex flex-col gap-5">
        <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Inter'] leading-tight">
          {s.title}
        </h1>
        <div className="h-px w-full bg-neutral-200" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          {/* Profile and actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
            {/* Avatar and Name */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-zinc-100 rounded-full flex justify-center items-center overflow-hidden">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={s.mainImage}
                  alt={s.title}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold font-['Inter']">
                  {/* {s.tags?.[0] || "Designer"} */}
                  Team Agency
                </div>
                <div className="text-gray-900/50 text-base sm:text-lg font-medium font-['Inter']">
                  {/* {s.tags?.[1] || ""} */}
                  Shot
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
              aria-label="Like"
              onClick={handleLike}
              disabled={liking}
            >
              <LikeIcon />
              <span className="ml-1 text-gray-700">{likes}</span>
            </button>
            {/* <button
              className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Save"
            >
              <SaveIcon />
            </button>
            <button className="p-3 bg-gray-900 rounded-xl border border-gray-900 flex items-center justify-center text-white font-bold text-base sm:text-lg font-['Arial'] hover:bg-gray-800 transition">
              Get in touch
            </button> */}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full flex flex-col gap-12">
        {/* Image Section */}
        <div className="w-full bg-gray-900 rounded-3xl p-2 sm:p-5 flex flex-col items-center">
          <img
            className="w-full max-w-full rounded-2xl object-cover"
            src={s.mainImage}
            alt={s.title}
          />
        </div>

        {/* Text Section */}
        <div className="w-full bg-slate-50 rounded-3xl p-6 sm:p-10 flex flex-col gap-8">
          <div
            className="text-gray-900 text-base sm:text-lg md:text-2xl font-normal font-['Inter'] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: s.description }}
          />
        </div>

        {/* More Images/Sections - if you want to show more images, you can map them here */}
        {s.images?.slice(1).map((img, idx) => (
          <div
            key={img}
            className="w-full bg-gray-900 rounded-3xl p-2 sm:p-5 flex flex-col items-center"
          >
            <img
              className="w-full max-w-full rounded-2xl object-cover"
              src={img}
              alt={`Project visual ${idx + 2}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
