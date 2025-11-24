// app/blogs/[id]/page.jsx

import MainBlogDescription from "../../../../../components/blog/blogid/MainBlogDescription";

export default async function Page({ params }) {
  const { id } = params;
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  let blogData = null;

  try {
    const res = await fetch(`${baseUrl}/blogs/slug/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch blog");
    blogData = await res.json();
  } catch (err) {
    blogData = { success: false, data: null, error: err.message };
  }

  return (
    <div>
      <MainBlogDescription blog={blogData} />
    </div>
  );
}
