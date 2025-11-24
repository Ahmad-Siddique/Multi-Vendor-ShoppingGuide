"use client"
// import { auth } from "@/auth";
import axios from "axios";

import AllServicesAdmin from "../../../../components/admin/services/AllServices";
import AllBlogsAdmin from "../../../../components/admin/blogs/AllBlogs";
import { useAuth } from "../../../../components/useable/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminBlogsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (!user || user.role !== "admin") return;
    const searchQ = searchParams.get("search") || "";
    const pageQ = searchParams.get("page") || 1;
    setSearch(searchQ);
    setFetching(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/admin/all`, {
        params: { search: searchQ, page: pageQ },
        withCredentials: true,
      })
      .then((response) => {
        setBlogs(response.data.shots || response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      })
      .catch((error) => {
        setBlogs([]);
        setTotalPages(1);
        setCurrentPage(1);
      })
      .finally(() => setFetching(false));
  }, [user, searchParams]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <AllBlogsAdmin
      blogs={blogs}
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={search}
      loading={fetching}
    />
  );
}
