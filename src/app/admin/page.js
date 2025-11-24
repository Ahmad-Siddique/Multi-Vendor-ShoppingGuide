"use client"
import React from 'react'
import { useAuth } from "../../../components/useable/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [user, loading, router]);
  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return null;
  return <div>Welcome to the Admin Dashboard</div>;
}