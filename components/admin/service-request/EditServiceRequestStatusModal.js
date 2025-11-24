"use client";

import React, { useState } from "react";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function EditServiceRequestStatusModal({
  isOpen,
  onClose,
  serviceRequestId,
  currentStatus,
}) {
  const [status, setStatus] = useState(currentStatus || "pending");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Handle status update
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/serviceuserneed/${serviceRequestId}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(`Successfully updated status to: ${status}`);
        // Force refresh by reloading the page
        window.location.reload();
        // Automatically close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error: " + (err.message || "Failed to update status"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-10">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Update Status
          </h2>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleStatusUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                required
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {submitting ? "Updating..." : "Update Status"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
