import HomePage from "../../components/home/HomePage";


export default async function Page() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  let shotsData = null;

  try {
    const res = await fetch(`${baseUrl}/shots`, { cache: "no-store" });
   
    if (!res.ok) throw new Error("Failed to fetch shots");
    shotsData = await res.json();
  } catch (err) {
    shotsData = { success: false, data: [], error: err.message };
  }

  return (
    <div>
      <HomePage shots={shotsData} />
    </div>
  );
}








