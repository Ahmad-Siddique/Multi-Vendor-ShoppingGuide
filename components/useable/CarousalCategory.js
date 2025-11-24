"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const categories = [
  {
    title: "Branding",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Product Design",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Animation",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Web Design",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Illustration",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Typography",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Mobile",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Print",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  // Add more slides for desktop
  {
    title: "Branding 2",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Product Design 2",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

export default function CarousalCategory() {
  const swiperRef = useRef(null);
  const router = useRouter();

  // Handle category click
  const handleCategoryClick = (categoryTitle) => {
    router.push(`/shots?category=${encodeURIComponent(categoryTitle)}`);
  };

  // Pause/resume autoplay on mouse enter/leave
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };
  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div className="w-full py-8 max-w-[1920px] mx-auto px-4">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 18 },
            640: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 28 },
            1400: { slidesPerView: 6, spaceBetween: 32 }, // Added specific breakpoint for 1400px
            1536: { slidesPerView: 7, spaceBetween: 32 },
          }}
          loop
          speed={9000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="!pb-2"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.title}>
              <div
                className="flex flex-col group cursor-pointer"
                onClick={() => handleCategoryClick(cat.title)}
              >
                {/* Changed fixed widths to percentage-based with aspect ratio */}
                <div className="w-full aspect-[4/3] rounded-lg bg-white flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={cat.image}
                    alt={cat.title}
                    draggable={false}
                  />
                </div>
                <div className="mt-2 text-gray-900 text-xs sm:text-sm md:text-base font-medium font-['Inter'] leading-6">
                  {cat.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx global>{`
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
}
