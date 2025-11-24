"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-gray-50 rounded-lg border border-gray-200"></div>
  ),
});

// Rich text editor modules
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

export default function EditServiceModal({ isOpen, onClose, serviceId }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]); // Track deleted existing images
  const [dragActive, setDragActive] = useState(false);
  const [price, setPrice] = useState("");
  const [concepts, setConcepts] = useState("");
  const [duration, setDuration] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  // Fetch service data when modal opens
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (isOpen && serviceId && !fetchingRef.current) {
      const fetchServiceData = async () => {
        fetchingRef.current = true;
        setLoading(true);
        setSuccessMessage("");

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/admin/getservice/${serviceId}`,
            { withCredentials: true }
          );
          const data = response.data.data || null;
          console.log("SERVICE DATA FETCHED", data);
          setServiceData(data);
          if (data) {
            setTitle(data.title || "");
            setTags(data.tags || []);
            setDescription(data.description || "");
            setPrice(data.price || "");
            setConcepts(data.conceptsAndRevisions || "");
            setDuration(data.projectDuration || "");

            // Handle multiple images with proper identification
            if (data.images && Array.isArray(data.images)) {
              const imageObjects = data.images.map((img, index) => ({
                id: `existing-${index}`, // Unique identifier for existing images
                src: img,
                file: null,
                type: "image/jpeg",
                name: `image-${index + 1}`,
                isExisting: true, // Flag to identify existing vs new images
                originalUrl: img, // Store original URL for deletion tracking
              }));
              setUploadedImages(imageObjects);
            }
          }
        } catch (error) {
          console.error("Error fetching service data:", error);
          alert("Failed to load service data.");
        } finally {
          setLoading(false);
          fetchingRef.current = false;
        }
      };

      fetchServiceData();
    }
  }, [isOpen, serviceId]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      fetchingRef.current = false;
      setServiceData(null);
      setTitle("");
      setTags([]);
      setTagInput("");
      setDescription("");
      setUploadedImages([]);
      setDeletedImages([]);
      setPrice("");
      setConcepts("");
      setDuration("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  // Handle tag input
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 20) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle drag events for image upload
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Process multiple files (max 5)
  const handleFiles = (files) => {
    const imageFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type === "video/mp4"
    );
    if (imageFiles.length === 0) return;

    const newFiles = imageFiles.slice(0, 5 - uploadedImages.length);
    if (uploadedImages.length + newFiles.length > 5) return;

    const newImagesPromises = newFiles.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            id: `new-${Date.now()}-${index}`, // Unique identifier for new images
            src: reader.result,
            type: file.type,
            name: file.name,
            file,
            isExisting: false, // Flag to identify new images
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagesPromises).then((newImages) => {
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    });
  };

  // Remove a specific image (FIXED)
  const removeImage = useCallback(
    (imageId) => {
      const imageToRemove = uploadedImages.find((img) => img.id === imageId);

      if (imageToRemove && imageToRemove.isExisting) {
        setDeletedImages((prev) => {
          if (!prev.includes(imageToRemove.originalUrl)) {
            return [...prev, imageToRemove.originalUrl];
          }
          return prev;
        });
      }

      setUploadedImages((prevImages) =>
        prevImages.filter((img) => img.id !== imageId)
      );
    },
    [uploadedImages]
  );
  

  // Submit handler for edit form with API call
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("price", price);
      formData.append("conceptsAndRevisions", concepts);
      formData.append("projectDuration", duration);
      formData.append("description", description);

      // Add deleted images to FormData
      deletedImages.forEach((imageUrl) => {
        formData.append("deletedImages[]", imageUrl);
      });

      // Only add new images (those with file property)
      uploadedImages.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${serviceId}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(`Successfully updated service: ${title}`);
        // Force refresh by reloading the page
        window.location.reload();
        // Automatically close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to update service");
      }
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Error: " + (err.message || "Failed to update service"));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-10">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* X Icon for Cancel on Top Right */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="text-center py-6">
            <p className="text-gray-600">Loading service data...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mt-4"></div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Edit Service: {serviceData?.title || "Loading..."}
            </h2>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span>{successMessage}</span>
              </div>
            )}
            <form
              onSubmit={handleEditSubmit}
              className="w-full flex flex-col gap-6"
            >
              {/* Multiple Image Upload Area */}
              <div className="w-full flex flex-col gap-2.5">
                <div className="w-full p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-900 flex flex-col gap-2.5">
                  <div
                    className={`w-full p-6 bg-emerald-50/30 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex flex-col items-center gap-6 ${
                      dragActive ? "bg-emerald-50/60" : ""
                    }`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    {uploadedImages.length > 0 ? (
                      <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group">
                              {image.type.startsWith("image/") ? (
                                <img
                                  src={image.src}
                                  alt={image.name}
                                  className="w-full h-40 object-cover rounded-lg"
                                />
                              ) : (
                                <video
                                  src={image.src}
                                  className="w-full h-40 object-cover rounded-lg"
                                  controls
                                />
                              )}
                              <button
                                type="button"
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-70 hover:opacity-100 transition"
                              >
                                <XMarkIcon className="w-4 h-4 text-gray-900" />
                              </button>
                              {/* Show indicator for existing vs new images */}
                              <div className="absolute bottom-2 left-2">
                                <span
                                  className={`px-2 py-1 text-xs rounded ${
                                    image.isExisting
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {image.isExisting ? "Existing" : "New"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                            disabled={uploadedImages.length >= 5}
                          >
                            Add More
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // Track all existing images for deletion
                              const existingImages = uploadedImages.filter(
                                (img) => img.isExisting
                              );
                              setDeletedImages((prev) => [
                                ...prev,
                                ...existingImages.map((img) => img.originalUrl),
                              ]);
                              setUploadedImages([]);
                            }}
                            className="px-4 py-2 border border-gray-900 rounded-lg"
                          >
                            Remove All
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {uploadedImages.length}/5 images selected
                          {deletedImages.length > 0 && (
                            <span className="ml-2 text-red-600">
                              ({deletedImages.length} marked for deletion)
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-gray-900 rounded-[200px] flex justify-center items-center cursor-pointer">
                          <ArrowUpTrayIcon
                            className="w-6 h-6 text-white"
                            onClick={() => fileInputRef.current.click()}
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-zinc-700 text-lg font-normal font-['Inter']">
                            Drag and drop images, or{" "}
                          </span>
                          <span
                            className="text-gray-900 text-lg font-bold font-['Inter'] cursor-pointer"
                            onClick={() => fileInputRef.current.click()}
                          >
                            Browse
                          </span>
                        </div>
                        <div className="text-zinc-700 text-sm font-normal font-['Inter']">
                          Minimum 1600px width recommended. Max 10MB each (20MB
                          for videos)
                        </div>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/mp4"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      disabled={uploadedImages.length >= 5}
                    />
                  </div>
                </div>
              </div>

              {/* Form Fields - Same as before */}
              <div className="w-full flex flex-col gap-6">
                {/* Title and Tags Row */}
                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Title Field */}
                  <div className="w-full flex-1 flex flex-col gap-2">
                    <label className="text-gray-900 text-base font-medium font-['Inter']">
                      Title
                    </label>
                    <div className="w-full p-4 bg-emerald-50/30 rounded-[16px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex items-center">
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-zinc-700 text-base font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Tags Field */}
                  <div className="w-full flex-1 flex flex-col gap-2">
                    <label className="text-gray-900 text-base font-medium font-['Inter']">
                      Tags
                    </label>
                    <div className="w-full p-4 bg-emerald-50/30 rounded-[16px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex flex-wrap items-center gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder={
                          tags.length === 0 ? "Add Tags (maximum 20)" : ""
                        }
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="flex-1 min-w-[100px] bg-transparent text-zinc-700 text-base font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                        disabled={tags.length >= 20}
                      />
                    </div>
                  </div>
                </div>

                {/* Price, Concepts, Duration Row */}
                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Price Field */}
                  <div className="w-full flex-1 flex flex-col gap-2">
                    <label className="text-gray-900 text-base font-medium font-['Inter']">
                      Price
                    </label>
                    <div className="w-full p-4 bg-emerald-50/30 rounded-[16px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex items-center">
                      <span className="text-gray-900 mr-2 font-medium">$</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-transparent text-zinc-700 text-base font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  {/* Concepts and Revisions Field */}
                  <div className="w-full flex-1 flex flex-col gap-2">
                    <label className="text-gray-900 text-base font-medium font-['Inter']">
                      Concepts and Revisions
                    </label>
                    <div className="w-full p-4 bg-emerald-50/30 rounded-[16px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex items-center">
                      <input
                        type="text"
                        placeholder="e.g. 2 concepts, 3 revisions"
                        value={concepts}
                        onChange={(e) => setConcepts(e.target.value)}
                        className="w-full bg-transparent text-zinc-700 text-base font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Project Duration Field */}
                  <div className="w-full flex-1 flex flex-col gap-2">
                    <label className="text-gray-900 text-base font-medium font-['Inter']">
                      Project Duration
                    </label>
                    <div className="w-full p-4 bg-emerald-50/30 rounded-[16px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex items-center">
                      <input
                        type="text"
                        placeholder="e.g. 2 weeks"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full bg-transparent text-zinc-700 text-base font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description Field with Rich Text Editor */}
                <div className="w-full flex flex-col gap-2">
                  <div>
                    <span className="text-gray-900 text-base font-medium font-['Inter']">
                      Description{" "}
                    </span>
                    <span className="text-rose-500 text-base font-medium font-['Inter']">
                      *
                    </span>
                  </div>
                  <div className="w-full p-0.5 rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col">
                    <div className="quill-wrapper" style={{ height: "200px" }}>
                      {typeof window !== "undefined" && (
                        <ReactQuill
                          theme="snow"
                          value={description}
                          onChange={setDescription}
                          modules={modules}
                          className="bg-gray-50 rounded-bl-lg rounded-br-lg h-full"
                          placeholder="Tell us about your service..."
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 mt-6">
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
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
