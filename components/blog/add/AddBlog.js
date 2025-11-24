"use client";
import React, { useState, useRef } from "react";
import {
  PlusIcon,
  ArrowUpTrayIcon,
  ListBulletIcon,
  BoltIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";


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

const AddBlog = () => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router=useRouter()

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

  // Rich text editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  // Handle drag events
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

  // Process the file
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

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!description || description.replace(/<(.|\n)*?>/g, '').trim().length < 20)
      newErrors.description = "Description must be at least 20 characters.";
    if (!uploadedImage) newErrors.image = "Image is required.";
    return newErrors;
  };

  // --- API INTEGRATION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("category", category);
      formData.append("description", description);
      if (uploadedImage && uploadedImage.file) {
        formData.append("image", uploadedImage.file);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to submit blog");
      }

      setSubmitSuccess(true);
      setTitle("");
      setTags([]);
      setTagInput("");
      setCategory("");
      setDescription("");
      setUploadedImage(null);
      setErrors({});
       router.push("/admin/blogs");
    } catch (err) {
      setSubmitError("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="w-full max-w-7xl flex flex-col items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        <h1 className="text-center text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold font-['Source_Serif_4']">
          What have you been working on?
        </h1>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full p-4 sm:p-6 md:p-8 lg:p-12 rounded-[40px] outline outline-1 outline-offset-[-1px] outline-zinc-400 flex flex-col justify-start items-end gap-8 sm:gap-12 md:gap-16 lg:gap-20"
        >
          {submitError && (
            <div className="mb-4 text-red-600 text-sm">{submitError}</div>
          )}
          {submitSuccess && (
            <div className="mb-4 text-green-600 text-sm">Blog submitted successfully!</div>
          )}
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
                        Change Image
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
                        Minimum 1600px width recommended. Max 10MB each (20MB
                        for videos)
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
              {errors.image && <div className="text-red-600 text-xs mt-1">{errors.image}</div>}
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-full flex flex-col gap-10">
            {/* Title and Category Row */}
            <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-end">
              {/* Title Field */}
              <div className="w-full flex-1 flex flex-col gap-2.5">
                <label className="text-gray-900 text-base font-semibold">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
                  placeholder="Enter blog title"
                />
                {errors.title && <div className="text-red-600 text-xs mt-1">{errors.title}</div>}
              </div>

              {/* Category Field */}
              <div className="w-full flex-1 flex flex-col gap-2.5">
                <label className="text-gray-900 text-base font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <div className="text-red-600 text-xs mt-1">{errors.category}</div>}
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
                  placeholder={tags.length === 0 ? "Add Tags (maximum 20)" : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="flex-1 min-w-[100px] bg-transparent text-zinc-700 text-base sm:text-lg font-normal font-['Inter'] placeholder-zinc-700 focus:outline-none"
                  disabled={tags.length >= 20}
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="w-full flex flex-col gap-2.5">
              <label className="text-gray-900 text-base font-semibold">Description</label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={modules}
                className="bg-white rounded-lg border border-gray-300"
              />
              {errors.description && <div className="text-red-600 text-xs mt-1">{errors.description}</div>}
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
            {/* <button
              type="button"
              className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-900 flex justify-center items-center"
            >
              <span className="text-center text-gray-900 text-lg sm:text-xl font-bold font-['Arial'] leading-normal">
                Save as draft
              </span>
            </button> */}

            <button
              type="submit"
              disabled={submitting}
              className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gray-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-900 flex justify-center items-center cursor-pointer"
            >
              <span className="text-center text-white text-lg sm:text-xl font-bold font-['Arial'] leading-normal">
                {submitting ? "Submitting..." : "Submit"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
