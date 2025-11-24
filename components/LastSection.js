"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ShotCard from "./useable/ShotCard"; // Adjust the import path if needed

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const LastSection = () => {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to map API data to static data structure
  const mapApiDataToStaticStructure = (apiShots) => {
    return apiShots.map((shot, index) => ({
      id: shot._id,
      image: shot.mainImage,
      title: shot.title,
      user: {
        name: "Designer", // Placeholder - replace with actual user data when available
        avatar:
          "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416", // Placeholder
        badge: index % 2 === 0 ? "Pro" : "Team", // Alternating placeholder badges
      },
      likes: shot.likes,
      views:
        shot.views > 1000
          ? `${(shot.views / 1000).toFixed(1)}k`
          : shot.views.toString(),
      pro: index % 3 === 0, // Placeholder - every 3rd item is pro
      team: index % 2 === 0, // Placeholder - every 2nd item is team
      href: `/shots/view/${shot.slug}`,
      tags: shot.tags || [],
      createdAt: shot.createdAt,
      slug: shot.slug,
    }));
  };

  useEffect(() => {
    const fetchShots = async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/shots/more`, { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch shots");
        }

        const shotsData = await res.json();

        if (shotsData.success) {
          // Map API data to match static structure
          const mappedShots = mapApiDataToStaticStructure(shotsData.data);
          setShots(mappedShots);
        } else {
          throw new Error(shotsData.message || "Failed to fetch shots");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching shots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShots();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 bg-[#F9FAFB]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center">
              {/* Loading Spinner */}
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">
                Loading shots...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12 bg-[#F9FAFB]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 text-lg font-medium mb-2">
                Error loading shots
              </p>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!shots || shots.length === 0) {
    return (
      <section className="w-full py-12 bg-[#F9FAFB]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-600 text-lg">No shots available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-[#F9FAFB]">
      <div className="max-w-[1600px] mx-auto px-4">
        <Slider {...settings}>
          {shots.map((shot) => (
            <div key={shot.id} className="flex justify-center">
              <div className="max-w-[400px] w-full">
                <ShotCard shot={shot} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default LastSection;
