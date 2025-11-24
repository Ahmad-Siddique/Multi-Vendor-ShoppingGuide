// app/shots/page.jsx
import AllShots from "../../../components/shots/allshots/AllShots";

export default async function Page({ searchParams }) {
  // Await searchParams to get the actual object
  const params = await searchParams;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  // Convert params to a plain object, then to query string
  const query =
    params && typeof params === "object"
      ? new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).filter(
              ([key, value]) =>
                typeof value === "string" || typeof value === "number"
            )
          )
        ).toString()
      : "";

  let shotsData = null;

  try {
    const res = await fetch(`${baseUrl}/shots${query ? `?${query}` : ""}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch shots");
    shotsData = await res.json();
   
  } catch (err) {
    shotsData = { success: false, data: [], error: err.message };
  }

  return (
    <div>
      <AllShots shots={shotsData} />
    </div>
  );
}
