import ShotCard from "../useable/ShotCard"; // or your actual card component

export default function BlogDesign({ blogs }) {
  return (
    <section className="max-w-[1800px] w-full mx-auto px-2 md:px-8 py-12 font-sans">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          {/* Trending Designs */}
        </h2>
        {/* <a
          href="#"
          className="text-[#DCEFF6]-600 font-semibold hover:underline text-base"
        >
          View all
        </a> */}
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(blogs?.data || []).map((blog) => (
          <ShotCard
            type="blog"
            key={blog._id}
            shot={{
              id: blog._id,
              image: blog.image || "", // fallback if missing
              title: blog.title,
              user: {
                name: "Team Agency", // Or any other logic
                avatar:
                  "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416", // If you have a service owner image, put it here
                badge: "", // Or any badge logic
              },
              likes: blog.likes, // No likes in blog data
              views: blog.views, // No views in blog data
              pro: false,
              team: false,
              href: `/blogs/view/${blog.slug}`,
            }}
          />
        ))}
      </ol>

      {blogs?.hasMore && (
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-[#DCEFF6]-50 transition-colors shadow">
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
