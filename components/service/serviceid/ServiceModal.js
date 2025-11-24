import React, { useEffect, useState } from "react";

const ServiceModal = ({ service, onClose, serviceId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!service?.data) {
    return null;
  }

  const s = service.data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      formData.description.trim().length < 50
    ) {
      setSubmitMessage(
        "Please fill all fields and ensure description has minimum 50 characters"
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      console.log("Service ID",service.data._id);
      const response = await fetch(`${baseUrl}/serviceuserneed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: service.data._id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          description: formData.description.trim(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage("Request submitted successfully!");
        // Reset form
        setFormData({ name: "", email: "", description: "" });
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Error submitting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 md:p-10 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl cursor-pointer"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {s.title}
        </h2>

        {/* Image */}
        <img
          src={s.images?.[0] || "https://placehold.co/800x400"}
          alt={s.title}
          className="w-full rounded-xl mb-6"
        />

        {/* Section Heading */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {s.tags?.[0] || "Service Category"}
        </h3>

        {/* Subheading */}
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          Project Details
        </h4>

        {/* Description */}
        <div
          className="text-base text-gray-700 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{
            __html: s.description || "No description provided.",
          }}
        />

        {/* Concepts, Price, Duration */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-base font-bold text-gray-900">${s.price}</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Concepts & Revisions</div>
            <div className="text-base font-bold text-gray-900">
              {s.conceptsAndRevisions}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Project Duration</div>
            <div className="text-base font-bold text-gray-900">
              {s.projectDuration}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Textarea Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What are you looking for?
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe your project..."
              required
            />
            <p className="text-sm text-red-600 mt-1">Minimum 50 characters</p>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                submitMessage.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              isSubmitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
