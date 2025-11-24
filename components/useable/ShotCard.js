"use client";
import Image from "next/image";
import { useState } from "react";

// Reusable ShotCard Component
const ShotCard = ({ shot, type }) => {
  const [likes, setLikes] = useState(shot.likes);

  const handleLike = async () => {
    let endpoint;
    switch (type) {
      case "services":
        endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${shot.id}/like`;
        break;
      case "shots":
        endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shots/${shot.id}/like`;
        break;
      case "blog":
        endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${shot.id}/like`;
        break;
      default:
        console.error("Invalid shot type:", type);
        alert("Error: Invalid shot type");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Added for cross-origin auth
      });

      if (!response.ok) {
        throw new Error("Failed to like the shot");
      }

      const data = await response.json();
      setLikes(data.likes); // Update like count from API response
      // alert("Liked!");
    } catch (error) {
      console.error("Error liking shot:", error);
      alert("Error liking the shot");
    }
  };

  return (
    <div className="relative group rounded-3xl bg-white border border-gray-100 transition-shadow overflow-hidden">
      {/* Whole card clickable */}
      <a
        href={shot.href}
        className="absolute inset-0 z-10"
        aria-label={`View ${shot.title}`}
        tabIndex={0}
        style={{ pointerEvents: "auto" }}
        onClick={(e) => {
          // Ensure navigation occurs for card clicks
          if (!e.target.closest(".no-navigate")) {
            window.location.href = shot.href; // Force navigation
          }
        }}
      ></a>

      {/* Shot Image */}
      <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] 2xl:h-[280px] bg-gray-100 overflow-hidden">
        <Image
    src={shot.image}
    alt={shot.title}
    fill
    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-3xl"
    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
    priority
  />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent z-20 pointer-events-none">
          <div className="w-full flex items-center justify-between px-5 pb-4">
            <span className="text-white text-base md:text-lg font-semibold drop-shadow">
              {shot.title}
            </span>
            {/* Button container is above the link */}
            <div className="flex gap-3 relative z-30">
              <button
                type="button"
                className="bg-white/90 hover:bg-white text-pink-600 rounded-full p-2 shadow transition flex items-center justify-center pointer-events-auto no-navigate"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLike();
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M8 14s-5.5-3.3-5.5-7.2C2.5 4.3 4.2 2.5 6.2 2.5c1.1 0 2.1.6 2.8 1.6C9.7 3.1 10.7 2.5 11.8 2.5c2 0 3.7 1.8 3.7 4.3C13.5 10.7 8 14 8 14z" />
                </svg>
              </button>
              {/* Save button for bookmarking content */}
              {/* <button
                type="button"
                className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow transition flex items-center justify-center pointer-events-auto"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  alert("Saved!");
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="none"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 3.5A1.5 1.5 0 0 1 5.5 2h5A1.5 1.5 0 0 1 12 3.5V14l-4-2-4 2V3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Shot Details */}
      <div className="relative z-20 flex items-center gap-4 px-5 pt-3 pb-4">
        <Image
          src={shot.user.avatar}
          alt={shot.user.name}
          width={32}
          height={32}
          className="rounded-full border border-gray-200"
        />
        <div className="flex-1 min-w-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 truncate">
            <span className="font-semibold text-[17px] text-gray-900 truncate leading-tight">
              {shot.user.name}
            </span>
            {shot.user.badge === "Team" && (
              <span className="px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-700 font-semibold">
                Team
              </span>
            )}
            {shot.user.badge === "Pro" && (
              <span className="px-2 py-0.5 rounded bg-pink-100 text-xs text-pink-600 font-semibold">
                Pro
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                className="w-4 h-4 text-pink-600"
                aria-hidden="true"
              >
                <path d="M8 14s-5.5-3.3-5.5-7.2C2.5 4.3 4.2 2.5 6.2 2.5c1.1 0 2.1.6 2.8 1.6C9.7 3.1 10.7 2.5 11.8 2.5c2 0 3.7 1.8 3.7 4.3C13.5 10.7 8 14 8 14z" />
              </svg>
              {likes}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                className="w-4 h-4"
              >
                <path
                  d="M8 3C4.37 3 1.99 6.22 1.19 7.49c-.1.15-.15.23-.18.35-.02.09-.02.23 0 .32.03.12.08.2.18.35C1.99 9.78 4.37 13 8 13s6.01-3.22 6.81-4.49c.1-.15.15-.23.18-.35.02-.09.02-.23 0-.32-.03-.12-.08-.2-.18-.35C14.01 6.22 11.63 3 8 3Z"
                  fill="currentColor"
                />
                <path d="M8 10a2 2 0 100-4 2 2 0 000 4Z" fill="white" />
              </svg>
              {shot.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotCard;
