"use client"

import { useAuth } from "../../../../components/useable/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import AllServiceRequestsAdmin from "../../../../components/admin/service-request/AllServiceRequest";

export default function AdminServiceRequestsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serviceRequests, setServiceRequests] = useState([]);
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
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/serviceuserneed/`, {
        params: { search: searchQ, page: pageQ },
        withCredentials: true,
      })
      .then((response) => {
        setServiceRequests(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      })
      .catch((error) => {
        setServiceRequests([]);
        setTotalPages(1);
        setCurrentPage(1);
      })
      .finally(() => setFetching(false));
  }, [user, searchParams]);

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return null;
  return (
    <AllServiceRequestsAdmin
      serviceRequests={serviceRequests}
      totalPages={totalPages}
      currentPage={currentPage}
      searchQuery={search}
      loading={fetching}
    />
  );
}
