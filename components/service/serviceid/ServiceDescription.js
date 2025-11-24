"use client";
import React, { useState } from "react";
import ServiceModal from "./ServiceModal"; // Ensure this path is correct

export default function ServiceDescription({ service }) {
  // Fallback if no data
  if (!service?.success || !service?.data) {
    return (
      <div className="px-4 py-12 md:px-12 lg:px-24">
        <div className="bg-slate-50 rounded-2xl p-6 md:p-10 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h1>
        </div>
      </div>
    );
  }

  const s = service.data;
  const [selectedImage, setSelectedImage] = useState(s.images?.[0] || "");
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [likes, setLikes] = useState(s.likes || 0);
  const [liking, setLiking] = useState(false);

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${s._id}/like`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to like the service");
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      alert("Error liking the service");
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="px-4 py-12 md:px-12 lg:px-24">
      {showModal && <ServiceModal service={service} onClose={() => setShowModal(false)} />}

      <div className="bg-slate-50 rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          {s.title}
        </h1>
        <hr className="border-neutral-200 mb-4" />
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-zinc-100 rounded-full overflow-hidden">
                <img
                  src={s.images?.[0] || "https://placehold.co/70x91"}
                  alt="Service"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {/* {s.tags?.[0] || "Service"} */}
                  Team Agency
                </div>
                <div className="text-base font-medium text-gray-500">
                  {s.tags?.[1] || ""}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={handleLike}
              disabled={liking}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              <span className="text-gray-900 text-base font-medium">{likes}</span>
            </button>
            {/* <button className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                />
              </svg>
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition cursor-pointer">
              Get in touch
            </button> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Main image and thumbnails */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="bg-gray-900 p-4 md:p-6 rounded-3xl">
            <div className="rounded-xl overflow-hidden bg-white flex items-center justify-center min-h-[180px]">
              <img
                src={selectedImage}
                alt="Main Display"
                className="w-full object-contain max-h-[320px] md:max-h-[740px]"
              />
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {s.images?.map((img, index) => (
              <button
                key={img}
                className={`w-20 h-20 sm:w-24 sm:h-28 p-1 rounded-xl overflow-hidden border ${
                  selectedImage === img
                    ? "border-[#1BB0CE]"
                    : "border-transparent"
                } bg-gray-900 cursor-pointer transition`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-6 md:p-10 rounded-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              About this Service
            </h2>
            <div
              className="text-gray-900 text-base md:text-xl leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: s.description }}
            />
          </div>
        </div>

        {/* Right: Pricing and actions */}
        <div className="w-full lg:w-[571px] flex flex-col gap-10">
          <div className="bg-slate-50 p-6 md:p-10 rounded-2xl">
            <div className="text-3xl font-bold text-gray-900 mb-4">
              ${s.price}
            </div>
            <p className="text-gray-900 text-xl">
              <strong>Concepts and revisions:</strong> {s.conceptsAndRevisions}
            </p>
            <p className="text-gray-900 text-xl">
              <strong>Project Duration:</strong> {s.projectDuration}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className="flex-1 py-3 border border-gray-900 rounded-xl text-gray-900 font-bold cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Request services
              </button>
              <button
                className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold cursor-pointer"
                onClick={() => setShowPayment(true)}
              >
                Hire now
              </button>
            </div>

            {/* Payment Breakdown Panel */}
            {showPayment && (
              <div className="w-full mt-8 bg-slate-50 rounded-[20px] flex flex-col gap-8 p-4 sm:p-6 md:p-10 shadow transition-all">
                <div className="flex flex-col gap-5">
                  <div className="text-gray-900 text-2xl md:text-3xl font-bold font-['Inter'] leading-tight">
                    What you'll pay
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 text-base md:text-xl font-normal font-['Inter']">
                        Project Cost
                      </span>
                      <span className="text-gray-900 text-base md:text-xl font-bold font-['Inter']">
                        $
                        {s.price?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 text-base md:text-xl font-normal font-['Inter']">
                        Platform Fee
                      </span>
                      <span className="text-gray-900 text-base md:text-xl font-bold font-['Inter']">
                        $82.50
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 text-base md:text-xl font-normal font-['Inter']">
                        Processing Fee
                      </span>
                      <span className="text-gray-900 text-base md:text-xl font-bold font-['Inter']">
                        $89.70
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                      <span className="text-gray-900 text-base md:text-xl font-normal font-['Inter']">
                        Project Total
                      </span>
                      <span className="text-gray-900 text-base md:text-xl font-bold font-['Inter']">
                        $
                        {(s.price + 82.5 + 89.7).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 text-base md:text-xl font-normal font-['Inter']">
                      Pay with
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="px-5 py-4 bg-emerald-50/30 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex justify-between items-center">
                      <select
                        className="bg-transparent border-0 focus:ring-0 text-zinc-700 text-sm font-normal font-['Inter'] w-full cursor-pointer appearance-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Please select
                        </option>
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="stripe">Stripe</option>
                      </select>
                      <span className="ml-2 pointer-events-none">
                        <svg width="24" height="24" fill="none">
                          <rect
                            width="24"
                            height="2"
                            y="11"
                            fill="black"
                            rx="1"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex-1 p-4 rounded-2xl outline outline-1 outline-gray-900 text-slate-950 text-base md:text-xl font-bold font-['Arial'] bg-white hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => setShowPayment(false)}
                  >
                    Back
                  </button>
                  <button className="flex-1 p-4 bg-gray-900 rounded-2xl outline outline-1 outline-gray-900 text-white text-base md:text-xl font-bold font-['Arial'] hover:bg-gray-800 transition cursor-pointer">
                    Check out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
