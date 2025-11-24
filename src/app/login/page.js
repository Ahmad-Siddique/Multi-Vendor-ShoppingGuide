"use client";
import React, { useState } from "react";
import { useAuth } from "../../../components/useable/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      router.replace("/admin");
    } else {
      setError(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          {/* <img src="/logo1.png" alt="Logo" className="w-16 h-16 mb-2" /> */}
          <h1 className="text-3xl font-extrabold text-gray-900 font-['Source_Serif_4'] mb-1">Admin Login</h1>
          <p className="text-gray-500 text-base font-medium">Sign in to your admin account</p>
        </div>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2939] bg-gray-50 text-gray-900 text-base"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
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
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* <div className="mt-8 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} DribbbleCopy Admin. All rights reserved.
        </div> */}
      </div>
    </div>
  );
} 