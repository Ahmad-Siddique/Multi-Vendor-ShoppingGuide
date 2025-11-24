// app/services/page.jsx (or wherever your page file is)

import SingleProduct from "../../../../components/product/SingleProduct";



export default async function Page({ searchParams }) {
//   const baseUrl =
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

//   // Convert searchParams to a plain object, then to query string
//   const query =
//     searchParams && typeof searchParams === "object"
//       ? new URLSearchParams(
//           Object.fromEntries(
//             Object.entries(searchParams).filter(
//               ([key, value]) =>
//                 typeof value === "string" || typeof value === "number"
//             )
//           )
//         ).toString()
//       : "";

//   let servicesData = null;

//   try {
//     const res = await fetch(`${baseUrl}/services${query ? `?${query}` : ""}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch services");
//     servicesData = await res.json();
//   } catch (err) {
//     servicesData = { success: false, data: [], error: err.message };
//   }

  return (
    <div>
      {/* <AllServices services={servicesData} /> */}
      <SingleProduct />
    </div>
  );
}

