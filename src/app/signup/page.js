"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, phonenumber }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
      setSuccess(true);
      setTimeout(() => router.replace("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          {/* <img src="/logo1.png" alt="Logo" className="w-16 h-16 mb-2" /> */}
          <h1 className="text-3xl font-extrabold text-gray-900 font-['Source_Serif_4'] mb-1">Sign Up</h1>
          <p className="text-gray-500 text-base font-medium">Create your account</p>
        </div>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2939] bg-gray-50 text-gray-900 text-base"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2939] bg-gray-50 text-gray-900 text-base"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2939] bg-gray-50 text-gray-900 text-base"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2939] bg-gray-50 text-gray-900 text-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2939] bg-gray-50 text-gray-900 text-base"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Registration successful! Redirecting…</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#1E2939] hover:bg-[#16202b] text-white text-lg font-bold shadow-md transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span>
                <svg className="animate-spin h-5 w-5 mr-2 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing up…
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-400 text-xs">
          Already have an account? <a href="/login" className="text-[#1E2939] font-semibold hover:underline">Log in</a>
        </div>
      </div>
    </div>
  );
} 