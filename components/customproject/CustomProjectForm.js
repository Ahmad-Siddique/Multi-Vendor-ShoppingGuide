"use client";
import React, { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomProjectForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDescription: "",
    designCategories: [],
    timeframe: "",
    budget: "",
    businessName: "",
    businessWebsite: "",
    additionalServices: [],
    otherServices: "",
    allowContact: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;

    if (name === "designCategories") {
      // Limit to 3 selections for design categories
      if (checked && formData.designCategories.length < 3) {
        setFormData({
          ...formData,
          designCategories: [...formData.designCategories, category],
        });
      } else if (!checked) {
        setFormData({
          ...formData,
          designCategories: formData.designCategories.filter(
            (item) => item !== category
          ),
        });
      }
    } else if (name === "additionalServices") {
      if (checked) {
        setFormData({
          ...formData,
          additionalServices: [...formData.additionalServices, category],
        });
      } else {
        setFormData({
          ...formData,
          additionalServices: formData.additionalServices.filter(
            (item) => item !== category
          ),
        });
      }
    } else if (name === "allowContact") {
      setFormData({
        ...formData,
        allowContact: checked,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address.";
    if (!formData.projectDescription.trim() || formData.projectDescription.length < 20)
      newErrors.projectDescription = "Project description must be at least 20 characters.";
    if (formData.designCategories.length === 0)
      newErrors.designCategories = "Select at least one design category.";
    if (formData.designCategories.length > 3)
      newErrors.designCategories = "You can select up to 3 categories.";
    if (!formData.timeframe) newErrors.timeframe = "Timeframe is required.";
    if (!formData.budget) newErrors.budget = "Budget is required.";
    else if (formData.budget === "$5,000 - $10,000" || formData.budget === "$10,000 - $20,000" || formData.budget === "$20,000 - $50,000" || formData.budget === "$50,000+") {
      // All options are valid, but you can add more logic if needed
    } else {
      newErrors.budget = "Select a valid budget.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        projectDescription: "",
        designCategories: [],
        timeframe: "",
        budget: "",
        businessName: "",
        businessWebsite: "",
        additionalServices: [],
        otherServices: "",
        allowContact: false,
      });
      setErrors({});
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Design categories
  const designCategoryOptions = [
    "Animation",
    "Branding",
    "Illustration",
    "Mobile",
    "Print",
    "Product Design",
    "Typography",
    "Web Design",
  ];

  // Additional services
  const additionalServiceOptions = [
    "Invoicing",
    "Custom agreements",
    "Account manager",
  ];

  // Timeframe options
  const timeframeOptions = [
    "Less than 1 week",
    "1-2 weeks",
    "2-4 weeks",
    "1-2 months",
    "More than 2 months",
  ];

  // Budget options
  const budgetOptions = [
    "$5,000 - $10,000",
    "$10,000 - $20,000",
    "$20,000 - $50,000",
    "$50,000+",
  ];

  return (
    <div className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h1 className="text-slate-950 text-2xl sm:text-3xl md:text-4xl font-normal font-['Source_Serif_4'] leading-tight text-center mb-4">
          Start Your Project with Expert Support
        </h1>

        <p className="text-slate-950 text-sm sm:text-base font-normal font-['Inter'] leading-snug text-center mb-8">
          Let us help you find the perfect designer for your project.
        </p>

        {/* How It Works Card */}
        <div className="w-full max-w-2xl mb-12 px-5 pt-10 pb-7 bg-white rounded-3xl flex flex-col gap-2.5 border border-zinc-100 shadow-sm">
          <h2 className="text-gray-700 text-xl font-bold font-['Inter'] leading-7 mb-4">
            How It Works
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex justify-center items-center shrink-0">
              <span className="text-white text-base font-normal font-['Inter']">
                1
              </span>
            </div>
            <p className="text-slate-950 text-sm sm:text-base font-normal font-['Inter'] leading-tight">
              <span className="font-bold">Submit your project details </span>
              and get connected with talent carefully chosen by our experts.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex justify-center items-center shrink-0">
              <span className="text-white text-base font-normal font-['Inter']">
                2
              </span>
            </div>
            <p className="text-black text-sm sm:text-base font-normal font-['Inter'] leading-tight">
              Review our recommendations and request proposals from your
              favorite designers.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex justify-center items-center shrink-0 mt-1">
              <span className="text-white text-base font-normal font-['Inter']">
                3
              </span>
            </div>
            <p className="text-black text-sm sm:text-base font-normal font-['Inter'] leading-tight">
              Select your designer and kick off your project on Dribbble, with{" "}
              <a href="#" className="text-slate-950 underline">
                secure payments
              </a>{" "}
              and seamless collaboration.
            </p>
          </div>
        </div>

        {/* Project Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-3xl border border-zinc-100 p-6 sm:p-10"
        >
          <h2 className="text-black text-xl font-normal font-['Inter'] leading-normal mb-8">
            Tell us about your project
          </h2>

          {submitError && (
            <div className="mb-4 text-red-600 text-sm">{submitError}</div>
          )}
          {submitSuccess && (
            <div className="mb-4 text-green-600 text-sm">Your project was submitted successfully!</div>
          )}

          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full h-10 p-3 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400"
              required
            />
            {errors.name && <div className="text-red-600 text-xs mt-1">{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <p className="text-slate-950 text-xs font-normal font-['Inter'] mb-2">
              If you have a Dribbble account, please provide the email address
              associated with your account.
              <br />
              No Dribbble account?{" "}
              <a href="#" className="text-slate-950 underline">
                Sign up here
              </a>
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full h-10 p-3 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400"
              required
            />
            {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Project Description <span className="text-red-600">*</span>
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Describe your project, including any specific design inspiration, requirements and goals."
              className="w-full min-h-28 p-3 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400"
              required
            />
            {errors.projectDescription && <div className="text-red-600 text-xs mt-1">{errors.projectDescription}</div>}
          </div>

          {/* Design Categories */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Design Categories <span className="text-red-600">*</span>
            </label>
            <p className="text-slate-950 text-xs font-normal font-['Inter'] mb-2">
              What design services do you require for your project? Select up to
              three.
            </p>
            <div className="flex flex-wrap gap-4 mb-2">
              {designCategoryOptions.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="designCategories"
                    checked={formData.designCategories.includes(category)}
                    onChange={(e) => handleCheckboxChange(e, category)}
                    className="w-3.5 h-3.5 rounded border border-zinc-500/20 bg-zinc-400/20 focus:outline-none"
                  />
                  <span className="text-zinc-500 text-xs font-normal font-['Inter']">
                    {category}
                  </span>
                </label>
              ))}
            </div>
            {errors.designCategories && <div className="text-red-600 text-xs mt-1">{errors.designCategories}</div>}
          </div>

          {/* Timeframe Field */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Timeframe <span className="text-red-600">*</span>
            </label>
            <p className="text-slate-950 text-xs font-normal font-['Inter'] mb-2">
              Select when you need the project to be completed.
            </p>
            <div className="relative">
              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full h-12 px-3 py-2 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400 appearance-none"
                required
              >
                <option value="" disabled>
                  Select…
                </option>
                {timeframeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.timeframe && <div className="text-red-600 text-xs mt-1">{errors.timeframe}</div>}
          </div>

          {/* Budget Field */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Budget (USD) <span className="text-red-600">*</span>
            </label>
            <p className="text-slate-950 text-xs font-normal font-['Inter'] mb-2">
              We'll connect you with a designer that fits your budget range.
            </p>
            <div className="relative">
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full h-12 px-3 py-2 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400 appearance-none"
                required
              >
                <option value="" disabled>
                  Select…
                </option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.budget && <div className="text-red-600 text-xs mt-1">{errors.budget}</div>}
            <p className="text-slate-950 text-xs font-normal font-['Inter'] mt-2">
              <span className="text-red-600">*</span> Project matching requires
              a <strong>minimum budget of $5,000 USD.</strong> For projects
              below this threshold, check out
              <a href="#" className="text-slate-950 underline">
                {" "}
                Designer{" "}
              </a>
              <a href="#" className="text-slate-950 underline">
                Search
              </a>{" "}
              to browse our full network.
            </p>
          </div>

          {/* Business Name */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Business Name (Optional)
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter Business Name"
              className="w-full h-10 p-3 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Business Website */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Business Website (Optional)
            </label>
            <input
              type="url"
              name="businessWebsite"
              value={formData.businessWebsite}
              onChange={handleChange}
              placeholder="Enter URL"
              className="w-full h-10 p-3 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Additional Services */}
          <div className="mb-6">
            <label className="block text-slate-950 text-sm font-normal font-['Inter'] mb-2">
              Do you need any additional services? (Optional)
            </label>
            <div className="flex flex-wrap gap-4 mb-2">
              {additionalServiceOptions.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="additionalServices"
                    checked={formData.additionalServices.includes(service)}
                    onChange={(e) => handleCheckboxChange(e, service)}
                    className="w-3.5 h-3.5 rounded border border-zinc-500/20 bg-zinc-400/20 focus:outline-none"
                  />
                  <span className="text-zinc-500 text-xs font-normal font-['Inter']">
                    {service}
                  </span>
                </label>
              ))}
            </div>
            <input
              type="text"
              name="otherServices"
              value={formData.otherServices}
              onChange={handleChange}
              placeholder="Other (please specify)"
              className="w-full h-10 p-3 bg-white rounded-[10px] border border-zinc-500/10 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Allow Contact */}
          <div className="mb-8">
            <label className="flex items-start gap-4 cursor-pointer">
              <input
                type="checkbox"
                name="allowContact"
                checked={formData.allowContact}
                onChange={(e) => handleCheckboxChange(e, null)}
                className="w-3.5 h-3.5 mt-1 rounded border border-zinc-500/20 bg-zinc-400/20 focus:outline-none"
              />
              <span className="text-zinc-500 text-xs font-normal font-['Inter']">
                I agree to share my contact info with agencies and designers for
                direct project inquiries. Dribbble may also connect me with
                relevant professionals who can assist me with my design needs.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-10 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold font-['Inter'] rounded-[30px] transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <svg className="animate-spin h-5 w-5 mr-2 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomProjectForm;
