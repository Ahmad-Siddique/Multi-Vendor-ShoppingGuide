"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  PlusIcon,
  ArrowUpTrayIcon,
  ListBulletIcon,
  BoltIcon,
  PhotoIcon,
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
  "Technology",
  "Design",
  "Development",
  "Business",
  "Marketing",
  "Lifestyle",
  "Tutorial",
  "News",
  "Opinion",
  "Review",
  "Case Study",
  "Industry Insights",
  "Tips & Tricks",
  "Best Practices",
  "Trends",
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

export default function EditBlogModal({ isOpen, onClose, blogId }) {
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
  const [blogData, setBlogData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  // Fetch blog data when modal opens
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (isOpen && blogId && !fetchingRef.current) {
      const fetchBlogData = async () => {
        fetchingRef.current = true;
        setLoading(true);
        setSuccessMessage("");

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/admin/getblog/${blogId}`,
            { withCredentials: true }
          );
          const data = response.data.data || null;
          console.log("BLOG DATA FETCHED", data);
          setBlogData(data);
          if (data) {
            setTitle(data.title || "");
            setTags(data.tags || []);
            setDescription(data.description || "");
            setCategory(data.category || "");
            setUploadedImage(
              data.image ? { src: data.image, file: null } : null
            );
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
          alert("Failed to load blog data.");
        } finally {
          setLoading(false);
          fetchingRef.current = false;
        }
      };

      fetchBlogData();
    }
  }, [isOpen, blogId]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      fetchingRef.current = false;
      setBlogData(null);
      setTitle("");
      setTags([]);
      setTagInput("");
      setDescription("");
      setCategory("");
      setUploadedImage(null);
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  // Handle file selection
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
        formData.append("image", uploadedImage.file);
      }
      tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("category", category);
      formData.append("description", description);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${blogId}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(`Successfully updated blog: ${title}`);
        // Force refresh by reloading the page
        window.location.reload();
        // Automatically close the modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Error: " + (err.message || "Failed to update blog"));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-10">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-7xl mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* X Icon for Cancel on Top Right */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="text-center py-6">
            <p className="text-gray-600">Loading blog data...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mt-4"></div>
          </div>
        ) : (
          <div className="w-full flex justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
            <div className="w-full max-w-7xl flex flex-col items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
              <h1 className="text-center text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold font-['Source_Serif_4']">
                Edit Blog: {blogData?.title || "Loading..."}
              </h1>

              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form
                onSubmit={handleEditSubmit}
                encType="multipart/form-data"
                className="w-full p-4 sm:p-6 md:p-8 lg:p-12 rounded-[40px] outline outline-1 outline-offset-[-1px] outline-zinc-400 flex flex-col justify-start items-end gap-8 sm:gap-12 md:gap-16 lg:gap-20"
              >
                {/* Image Upload Area */}
                <div className="w-full flex flex-col gap-2.5">
                  <div className="w-full p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-900 flex flex-col gap-2.5">
                    <div
                      className={`w-full p-8 sm:p-12 md:p-16 lg:p-24 bg-emerald-50/30 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex flex-col items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 ${
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
                            className="max-w-full max-h-[300px] rounded-lg object-contain"
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

                          <div className="w-full flex flex-col gap-4 text-center">
                            <div>
                              <span className="text-zinc-700 text-lg sm:text-xl md:text-2xl font-normal font-['Inter']">
                                Drag and drop an image, or{" "}
                              </span>
                              <span
                                className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold font-['Inter'] cursor-pointer"
                                onClick={() => fileInputRef.current.click()}
                              >
                                Browse
                              </span>
                            </div>
                            <div className="text-zinc-700 text-sm sm:text-base font-normal font-['Inter']">
                              Minimum 1600px width recommended. Max 10MB each
                              (20MB for videos)
                            </div>
                          </div>

                          <div className="w-full flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
                            <div className="flex flex-col gap-6 sm:gap-10">
                              <div className="flex items-center gap-2 text-zinc-700 text-sm sm:text-base font-normal font-['Inter']">
                                <PhotoIcon className="w-5 h-5 text-zinc-700" />
                                High resolution images (png, jpg, gif)
                              </div>
                              <div className="flex items-center gap-2 text-zinc-700 text-sm sm:text-base font-normal font-['Inter']">
                                <BoltIcon className="w-5 h-5 text-zinc-700" />
                                Videos (mp4)
                              </div>
                            </div>
                            <div className="flex flex-col gap-6 sm:gap-10">
                              <div className="flex items-center gap-2 text-zinc-700 text-sm sm:text-base font-normal font-['Inter']">
                                <PhotoIcon className="w-5 h-5 text-zinc-700" />
                                Animated gifs
                              </div>
                              <div className="flex items-center gap-2 text-zinc-700 text-sm sm:text-base font-normal font-['Inter']">
                                <ListBulletIcon className="w-5 h-5 text-zinc-700" />
                                Only upload media you own the rights to
                              </div>
                            </div>
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
                <div className="w-full flex flex-col gap-10">
                  {/* Title and Category Row */}
                  <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-end">
                    {/* Title Field */}
                    <div className="w-full flex-1 flex flex-col gap-2.5">
                      <label className="text-gray-900 text-base sm:text-lg font-medium font-['Inter']">
                        Title
                      </label>
                      <div className="w-full p-5 bg-emerald-50/30 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex items-center">
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-transparent text-zinc-700 text-base sm:text-lg font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Category Select Field */}
                    <div className="w-full flex-1 flex flex-col gap-2.5">
                      <label className="text-gray-900 text-base sm:text-lg font-medium font-['Inter']">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-5 bg-emerald-50/30 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 text-zinc-700 text-base sm:text-lg font-normal font-['Inter'] cursor-pointer focus:outline-none"
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
                    </div>
                  </div>

                  {/* Tags Field */}
                  <div className="w-full flex flex-col gap-2.5">
                    <label className="text-gray-900 text-base sm:text-lg font-medium font-['Inter']">
                      Tags
                    </label>
                    <div className="w-full p-5 bg-emerald-50/30 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-gray-900/20 flex flex-wrap items-center gap-2">
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
                        className="flex-1 min-w-[100px] bg-transparent text-zinc-700 text-base sm:text-lg font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                        disabled={tags.length >= 20}
                      />
                    </div>
                  </div>

                  {/* Description Field with Rich Text Editor */}
                  <div className="w-full flex flex-col gap-2.5">
                    <div>
                      <span className="text-gray-900 text-lg sm:text-xl font-medium font-['Inter'] leading-snug">
                        Description{" "}
                      </span>
                      <span className="text-rose-500 text-lg sm:text-xl font-medium font-['Inter'] leading-snug">
                        *
                      </span>
                    </div>

                    <div className="w-full p-0.5 rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col">
                      <div
                        className="quill-wrapper"
                        style={{ height: "300px" }}
                      >
                        {typeof window !== "undefined" && (
                          <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                            className="bg-gray-50 rounded-bl-lg rounded-br-lg h-full"
                            placeholder="Tell us about your blog..."
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add More Button */}
                {/* <div className="flex items-center gap-2.5">
                  <div className="p-5 bg-gray-900 rounded-[200px] flex items-center cursor-pointer">
                    <PlusIcon className="w-6 h-6 text-white" />
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 md:gap-16 lg:gap-20">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-900 flex justify-center items-center"
                  >
                    <span className="text-center text-gray-900 text-lg sm:text-xl font-bold font-['Arial'] leading-normal">
                      Cancel
                    </span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gray-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-900 flex justify-center items-center cursor-pointer"
                  >
                    <span className="text-center text-white text-lg sm:text-xl font-bold font-['Arial'] leading-normal">
                      {submitting ? "Saving..." : "Save Changes"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
