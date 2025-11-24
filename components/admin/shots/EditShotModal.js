"use client";

import React, { useState, useRef, useEffect } from "react";
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

const categories = [
  "Branding",
  "Product Design",
  "Animation",
  "Web Design",
  "Illustration",
  "Typography",
  "Mobile",
  "Print",
  "Photography",
  "Marketing",
  "UX/UI Design",
  "3D Design",
  "Game Design",
  "Motion Graphics",
  "Art Direction",
];

// Rich text editor modules
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

export default function EditShotModal({ isOpen, onClose, shotId }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shotData, setShotData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  // Fetch shot data when modal opens
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (isOpen && shotId && !fetchingRef.current) {
      const fetchShotData = async () => {
        fetchingRef.current = true; // Mark as fetching
        setLoading(true);
        setSuccessMessage("");

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/shots/admin/getshot/${shotId}`,
            { withCredentials: true }
          );
          const data = response.data.data || null;
          console.log("DATA FETCHED", data);
          setShotData(data);
          if (data) {
            setTitle(data.title || "");
            setTags(data.tags || []);
            setDescription(data.description || "");
            // setCategory(data.category || "");
            setUploadedImage(
              data.mainImage ? { src: data.mainImage, file: null } : null
            );
          }
        } catch (error) {
          console.error("Error fetching shot data:", error);
          alert("Failed to load shot data.");
        } finally {
          setLoading(false);
          fetchingRef.current = false; // Reset fetching flag
        }
      };

      fetchShotData();
    }
  }, [isOpen, shotId]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      fetchingRef.current = false; // Reset fetching flag
      setShotData(null);
      setTitle("");
      setTags([]);
      setTagInput("");
      setDescription("");
      // setCategory("");
      setUploadedImage(null);
      setSuccessMessage("");
    }
  }, [isOpen]);

  
  

  // Handle tag input for edit form
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

  // Handle drop event for image upload
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  // Process the file for image upload
  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage({
          src: reader.result,
          type: file.type,
          name: file.name,
          file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler for edit form with API call
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (uploadedImage && uploadedImage.file) {
        formData.append("mainImage", uploadedImage.file);
      }
      tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("description", description);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shots/${shotId}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(`Successfully updated shot: ${title}`);
        // Force refresh by navigating to the same route
        window.location.reload();
        // Automatically close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to update shot");
      }
    } catch (err) {
      console.error("Error updating shot:", err);
      alert("Error: " + (err.message || "Failed to update shot"));
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
            <p className="text-gray-600">Loading shot data...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mt-4"></div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Edit Shot: {shotData?.title || "Loading..."}
            </h2>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span>{successMessage}</span>
              </div>
            )}
            <form
              onSubmit={handleEditSubmit}
              encType="multipart/form-data"
              className="w-full flex flex-col gap-6"
            >
              {/* Image Upload Area */}
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
                    {uploadedImage ? (
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={uploadedImage.src}
                          alt="Uploaded"
                          className="max-w-full max-h-[200px] rounded-lg object-contain"
                        />
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadedImage(null)}
                            className="px-4 py-2 border border-gray-900 rounded-lg"
                          >
                            Remove
                          </button>
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
                            Drag and drop an image, or{" "}
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
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="w-full flex flex-col gap-6">
                {/* Title and Category Row */}
                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end">
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

                  {/* Category Select Field */}
                  {/* <div className="w-full flex-1 flex flex-col gap-2">
                    <label className="text-gray-900 text-base font-medium font-['Inter']">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-4 bg-emerald-50/30 rounded-[16px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 text-zinc-700 text-base font-normal font-['Inter'] cursor-pointer focus:outline-none"
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>

                {/* Tags Field */}
                <div className="w-full flex flex-col gap-2">
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
                          placeholder="Tell us about your work..."
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
