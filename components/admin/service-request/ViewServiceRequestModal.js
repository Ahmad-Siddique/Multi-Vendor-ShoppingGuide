"use client";

import React, { useState } from "react";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function ViewServiceRequestModal({
  isOpen,
  onClose,
  serviceRequest,
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!isOpen || !serviceRequest) return null;

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Check if description is long enough to need expansion
  const isLongDescription =
    serviceRequest.description && serviceRequest.description.length > 200;
  const displayDescription =
    isLongDescription && !isDescriptionExpanded
      ? `${serviceRequest.description.slice(0, 200)}...`
      : serviceRequest.description;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-10">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* X Icon for Cancel on Top Right */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="pr-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Service Request Details
          </h2>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <p className="text-gray-900 break-words">
                  {serviceRequest.name}
                </p>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <p className="text-gray-900 break-all">
                  {serviceRequest.email}
                </p>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(
                    serviceRequest.status
                  )}`}
                >
                  {serviceRequest.status || "Pending"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="p-3 bg-gray-50 rounded-md border min-h-[100px] relative">
                <p className="text-gray-900 whitespace-pre-wrap break-words word-wrap overflow-wrap-anywhere">
                  {displayDescription || "No description provided"}
                </p>

                {/* Expand/Collapse button for long descriptions */}
                {isLongDescription && (
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        <ChevronUpIcon className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className="w-4 h-4" />
                        Show More
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Created Date (if available) */}
            {serviceRequest.createdAt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submitted On
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <p className="text-gray-900">
                    {new Date(serviceRequest.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Additional fields if they exist */}
            {serviceRequest.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <p className="text-gray-900 break-words">
                    {serviceRequest.phone}
                  </p>
                </div>
              </div>
            )}

            {serviceRequest.company && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <p className="text-gray-900 break-words">
                    {serviceRequest.company}
                  </p>
                </div>
              </div>
            )}

            {serviceRequest.serviceType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <p className="text-gray-900 break-words">
                    {serviceRequest.serviceType}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
