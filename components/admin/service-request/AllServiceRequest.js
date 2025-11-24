"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ViewServiceRequestModal from "./ViewServiceRequestModal";
import EditServiceRequestStatusModal from "./EditServiceRequestStatusModal";

export default function AllServiceRequestsAdmin({
  serviceRequests = [],
  totalPages = 1,
  currentPage = 1,
  searchQuery = "",
}) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editStatusModalOpen, setEditStatusModalOpen] = useState(false);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState(null);
  const [search, setSearch] = useState(searchQuery);
  const [deleting, setDeleting] = useState(false);
  const debounceTimeout = useRef();

  // Open confirmation modal for delete
  const handleDeleteClick = (serviceRequest) => {
    setSelectedServiceRequest(serviceRequest);
    setDeleteModalOpen(true);
  };

  // Confirm deletion with API call
  const handleConfirmDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/serviceuserneed/${selectedServiceRequest._id}`,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 204) {
        setDeleteModalOpen(false);
        setSelectedServiceRequest(null);
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        throw new Error("Failed to delete service request");
      }
    } catch (err) {
      console.error("Error deleting service request:", err);
      alert("Error: " + (err.message || "Failed to delete service request"));
    } finally {
      setDeleting(false);
    }
  };

  // Close delete modal
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedServiceRequest(null);
  };

  // Open view modal
  const handleViewClick = (serviceRequest) => {
    setSelectedServiceRequest(serviceRequest);
    setViewModalOpen(true);
  };

  // Close view modal
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedServiceRequest(null);
  };

  // Open edit status modal
  const handleEditStatusClick = (serviceRequest) => {
    setSelectedServiceRequest(serviceRequest);
    setEditStatusModalOpen(true);
  };

  // Close edit status modal
  const handleCloseEditStatusModal = () => {
    setEditStatusModalOpen(false);
    setSelectedServiceRequest(null);
  };

  // Keep local search state in sync with prop
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  // Handle search input change and debounce URL update
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      router.replace(`/admin/service-requests?search=${encodeURIComponent(newSearch)}&page=1`);
    }, 350);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    router.push(
      `/admin/service-requests?search=${encodeURIComponent(
        search
      )}&page=${newPage}`
    );
  };

  // Handle create service request button click
  const handleCreateServiceRequestClick = () => {
    router.push("/custom-project");
  };

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

  return (
    <div className="max-w-full mx-auto">
      {/* Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          Service Requests Management
        </h1>
        {/* <button
          onClick={handleCreateServiceRequestClick}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer text-sm font-medium"
        >
          Create Service Request
        </button> */}
      </div>

      {/* Search Field */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search service requests..."
          value={search}
          onChange={handleSearchChange}
          className="w-full sm:w-64 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        {/* Table Container with Scroll on Mobile */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No service requests found.
                  </td>
                </tr>
              ) : (
                serviceRequests.map((serviceRequest) => (
                  <tr
                    key={serviceRequest._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {serviceRequest.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {serviceRequest.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {serviceRequest.description &&
                      serviceRequest.description.length > 15
                        ? `${serviceRequest.description.slice(0, 15)}...`
                        : serviceRequest.description || "No description"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                          serviceRequest.status
                        )}`}
                      >
                        {serviceRequest.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(serviceRequest);
                          }}
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStatusClick(serviceRequest);
                          }}
                        >
                          Edit Status
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(serviceRequest);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-between">
          <span className="text-gray-500 text-sm mb-2 sm:mb-0">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the service request from "
              {selectedServiceRequest?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                onClick={handleCancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Service Request Modal */}
      {viewModalOpen && (
        <ViewServiceRequestModal
          isOpen={viewModalOpen}
          onClose={handleCloseViewModal}
          serviceRequest={selectedServiceRequest}
        />
      )}

      {/* Edit Status Modal */}
      {editStatusModalOpen && (
        <EditServiceRequestStatusModal
          isOpen={editStatusModalOpen}
          onClose={handleCloseEditStatusModal}
          serviceRequestId={selectedServiceRequest?._id}
          currentStatus={selectedServiceRequest?.status}
        />
      )}
    </div>
  );
}
