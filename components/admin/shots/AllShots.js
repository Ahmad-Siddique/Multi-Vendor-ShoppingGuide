"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import EditShotModal from "./EditShotModal";

export default function AllShotsAdmin({
  shots = [],
  totalPages = 1,
  currentPage = 1,
  searchQuery = "",
}) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedShot, setSelectedShot] = useState(null);
  const [search, setSearch] = useState(searchQuery);
  const [deleting, setDeleting] = useState(false);

  // Open confirmation modal for delete
  const handleDeleteClick = (shot) => {
    setSelectedShot(shot);
    setDeleteModalOpen(true);
  };

  // Confirm deletion with API call
  const handleConfirmDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shots/${selectedShot._id}`,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 204) {
        // alert(`Successfully deleted shot: ${selectedShot.title}`);
        setDeleteModalOpen(false);
        setSelectedShot(null);
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        throw new Error("Failed to delete shot");
      }
    } catch (err) {
      console.error("Error deleting shot:", err);
      alert("Error: " + (err.message || "Failed to delete shot"));
    } finally {
      setDeleting(false);
    }
  };

  // Close delete modal
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedShot(null);
  };

  // Open edit modal immediately
  const handleEditClick = (shot) => {
    setSelectedShot(shot);
    setEditModalOpen(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedShot(null);
  };

  // Handle search input change and update URL
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    router.replace(`/admin/shots?search=${encodeURIComponent(newSearch)}&page=1`);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    router.push(
      `/admin/shots?search=${encodeURIComponent(search)}&page=${newPage}`
    );
  };

  // Handle create shots button click
  const handleCreateShotsClick = () => {
    router.push("/shots/add");
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
        Shots Management
      </h1>
        <button
          onClick={handleCreateShotsClick}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer text-sm font-medium"
        >
          Create Shot
        </button>
      </div>

      {/* Search Field */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search shots..."
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
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Likes
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tags
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
              {shots.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No shots found.
                  </td>
                </tr>
              ) : (
                shots.map((shot) => (
                  <tr
                    key={shot._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={shot.mainImage}
                        alt={shot.title}
                        className="h-12 w-12 rounded-md object-cover border border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shot.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shot.likes}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {shot.tags && shot.tags.length > 0
                        ? `${shot.tags.slice(0, 4).join(", ")}${
                            shot.tags.length > 4 ? "..." : ""
                          }`
                        : "No tags"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(shot);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(shot);
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
              Are you sure you want to delete the shot "{selectedShot?.title}"?
              This action cannot be undone.
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

      {/* Edit Shot Modal */}
      {editModalOpen && (
        <EditShotModal
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          shotId={selectedShot?._id}
        />
      )}
    </div>
  );
}
