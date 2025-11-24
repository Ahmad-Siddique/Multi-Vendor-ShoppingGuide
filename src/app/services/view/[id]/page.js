// app/services/[slug]/page.jsx

import ServiceDescription from "../../../../../components/service/serviceid/ServiceDescription";

export default async function Page({ params }) {
  const { id } = params;
  // console.log("PARAMS ID",params.id)
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  let serviceData = null;

  try {
    const res = await fetch(`${baseUrl}/services/slug/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch service");
    serviceData = await res.json();
    // console.log(serviceData)
  } catch (err) {
    serviceData = { success: false, data: null, error: err.message };
  }

  return (
    <div>
      <ServiceDescription service={serviceData} />
    </div>
  );
}
