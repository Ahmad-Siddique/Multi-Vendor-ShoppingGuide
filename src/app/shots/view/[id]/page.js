// app/shots/[slug]/page.jsx

import ShotsDescription from "../../../../../components/shots/shotsid/ShotsDescription";

export default async function Page({ params }) {
  const { id } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  let shotData = null;

  try {
    const res = await fetch(`${baseUrl}/shots/slug/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch shot");
    shotData = await res.json();
  } catch (err) {
    shotData = { success: false, data: null, error: err.message };
  }

  return (
    <div>
      <ShotsDescription shot={shotData} />
    </div>
  );
}
