import Image from "next/image";
import ShotCard from "./useable/ShotCard";

// Example shots data (replace with your real data)
const shots = [
  {
    id: 1,
    image:
      "https://cdn.dribbble.com/userupload/8706683/file/original-02a1378ce51d0e443da1ea708c64794d.png?format=webp&resize=400x300&vertical=center",
    title: "Dashboard - Web Builder",
    user: {
      name: "Vektora",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Team",
    },
    likes: 282,
    views: "87.8k",
    pro: false,
    team: true,
    href: "/blog/view/22047902-Dashboard-Web-Builder",
  },
  {
    id: 2,
    image:
      "https://cdn.dribbble.com/userupload/4090779/file/original-8c94552f7e96817366246cf942b81d42.png?format=webp&resize=400x300&vertical=center",
    title: "Writing dashboard exploration (2)",
    user: {
      name: "Eugen Eşanu",
      avatar:
        "https://cdn.dribbble.com/users/930637/avatars/small/469a65680bb255b4b5211b428513a495.jpg?1513888254",
      badge: "Pro",
    },
    likes: 184,
    views: "53.1k",
    pro: true,
    team: false,
    href: "/blog/view/20039963-Writing-dashboard-exploration-2",
  },
  {
    id: 3,
    image:
      "https://cdn.dribbble.com/userupload/8706683/file/original-02a1378ce51d0e443da1ea708c64794d.png?format=webp&resize=400x300&vertical=center",
    title: "Analytics Dashboard UI",
    user: {
      name: "Pixel True",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Team",
    },
    likes: 321,
    views: "91.2k",
    pro: false,
    team: true,
    href: "/blog/view/22047903-Analytics-Dashboard-UI",
  },
  {
    id: 4,
    image:
      "https://cdn.dribbble.com/userupload/4090779/file/original-8c94552f7e96817366246cf942b81d42.png?format=webp&resize=400x300&vertical=center",
    title: "Fintech App Concept",
    user: {
      name: "Lina Bell",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Pro",
    },
    likes: 210,
    views: "60.0k",
    pro: true,
    team: false,
    href: "/blog/view/22047904-Fintech-App-Concept",
  },
  {
    id: 5,
    image:
      "https://cdn.dribbble.com/userupload/8706683/file/original-02a1378ce51d0e443da1ea708c64794d.png?format=webp&resize=400x300&vertical=center",
    title: "E-commerce Product Page",
    user: {
      name: "Designify",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Team",
    },
    likes: 178,
    views: "42.7k",
    pro: false,
    team: true,
    href: "/blog/view/22047905-Ecommerce-Product-Page",
  },
  {
    id: 6,
    image:
      "https://cdn.dribbble.com/userupload/4090779/file/original-8c94552f7e96817366246cf942b81d42.png?format=webp&resize=400x300&vertical=center",
    title: "Crypto Wallet UI",
    user: {
      name: "CryptoArt",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Pro",
    },
    likes: 199,
    views: "48.3k",
    pro: true,
    team: false,
    href: "/blog/view/22047906-Crypto-Wallet-UI",
  },
  {
    id: 7,
    image:
      "https://cdn.dribbble.com/userupload/8706683/file/original-02a1378ce51d0e443da1ea708c64794d.png?format=webp&resize=400x300&vertical=center",
    title: "Fitness App Dashboard",
    user: {
      name: "FitDesign",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Team",
    },
    likes: 246,
    views: "77.9k",
    pro: false,
    team: true,
    href: "/blog/view/22047907-Fitness-App-Dashboard",
  },
  {
    id: 8,
    image:
      "https://cdn.dribbble.com/userupload/4090779/file/original-8c94552f7e96817366246cf942b81d42.png?format=webp&resize=400x300&vertical=center",
    title: "Travel Booking UI",
    user: {
      name: "TravelGo",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Pro",
    },
    likes: 153,
    views: "36.4k",
    pro: true,
    team: false,
    href: "/blog/view/22047908-Travel-Booking-UI",
  },
  {
    id: 9,
    image:
      "https://cdn.dribbble.com/userupload/8706683/file/original-02a1378ce51d0e443da1ea708c64794d.png?format=webp&resize=400x300&vertical=center",
    title: "Food Delivery App",
    user: {
      name: "Foodies",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Team",
    },
    likes: 165,
    views: "58.1k",
    pro: false,
    team: true,
    href: "/blog/view/22047909-Food-Delivery-App",
  },
  {
    id: 10,
    image:
      "https://cdn.dribbble.com/userupload/4090779/file/original-8c94552f7e96817366246cf942b81d42.png?format=webp&resize=400x300&vertical=center",
    title: "Banking App UI",
    user: {
      name: "Bankify",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Pro",
    },
    likes: 134,
    views: "29.9k",
    pro: true,
    team: false,
    href: "/blog/view/22047910-Banking-App-UI",
  },
  {
    id: 11,
    image:
      "https://cdn.dribbble.com/userupload/8706683/file/original-02a1378ce51d0e443da1ea708c64794d.png?format=webp&resize=400x300&vertical=center",
    title: "Portfolio Website",
    user: {
      name: "Portfolia",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Team",
    },
    likes: 198,
    views: "41.5k",
    pro: false,
    team: true,
    href: "/blog/view/22047911-Portfolio-Website",
  },
  {
    id: 12,
    image:
      "https://cdn.dribbble.com/userupload/4090779/file/original-8c94552f7e96817366246cf942b81d42.png?format=webp&resize=400x300&vertical=center",
    title: "Education Platform UI",
    user: {
      name: "EduPro",
      avatar:
        "https://cdn.dribbble.com/users/6567474/avatars/small/b849c692c6c9fc9cfdca178b90e354d2.png?1607746416",
      badge: "Pro",
    },
    likes: 177,
    views: "33.2k",
    pro: true,
    team: false,
    href: "/blog/view/22047912-Education-Platform-UI",
  },
];
  

const icons = {
  like: (
    <svg width={20} height={20} viewBox="0 0 16 16" fill="none">
      <path
        d="M10.74 2C13.09 2 14.667 4.235 14.667 6.32c0 4.223-6.548 7.68-6.667 7.68-.118 0-6.667-3.457-6.667-7.68C1.333 4.235 2.911 2 5.259 2c1.348 0 2.23.683 2.741 1.283C8.511 2.683 9.393 2 10.741 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  save: (
    <svg width={20} height={20} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.333 5.2C3.333 4.08 3.333 3.52 3.551 3.092c.192-.376.498-.682.874-.874C4.853 2 5.413 2 6.533 2h2.934c1.12 0 1.68 0 2.108.218.376.192.682.498.874.874.218.428.218.988.218 2.108V14l-4.667-2.667L3.333 14V5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  collection: (
    <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 5V3M17 5V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  comment: (
    <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
      <path
        d="M10 18c4.418 0 8-2.91 8-6.5S14.418 5 10 5 2 7.91 2 11.5c0 1.19.44 2.3 1.2 3.23C2.46 16.15 2 17.02 2 18h8z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  share: (
    <svg width={20} height={20} fill="none" viewBox="0 0 20 20">
      <path
        d="M15 8V5a3 3 0 10-6 0v3M5 12v3a3 3 0 006 0v-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 12V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

// Main Component
export default function TrendingDesigns() {
  return (
    <section className="max-w-[1800px] w-full mx-auto px-2 md:px-8 py-12 font-sans">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          {/* Trending Designs */}
        </h2>
        <a
          href="#"
          className="text-[#DCEFF6]-600 font-semibold hover:underline text-base"
        >
          View all
        </a>
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shots.map((shot) => (
          <ShotCard key={shot.id} shot={shot} />
        ))}
      </ol>

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-[#DCEFF6]-50 transition-colors shadow">
          Load more
        </button>
      </div>
    </section>
  );
}
