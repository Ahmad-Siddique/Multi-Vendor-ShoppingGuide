import React from "react";

const socialIcons = [
  {
    name: "Facebook",
    href: "#",
    svg: (
      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.84 3.66 8.85 8.33 9.77v-6.91H7.9v-2.86h2.43V9.84c0-2.4 1.43-3.73 3.62-3.73 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5v1.8h2.65l-.42 2.86h-2.23v6.91C18.34 20.92 22 16.91 22 12.07z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    svg: (
      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.4 11.1c0 .34.04.67.1.99C7.69 11.96 4.28 10.13 2.11 7.29c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.71-.02-1.38-.22-1.97-.54v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.07.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.7 8.7 0 0 0 24 4.59a8.57 8.57 0 0 1-2.54.7z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6.38.62a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.78-1.75-1.73s.78-1.73 1.75-1.73 1.75.78 1.75 1.73-.78 1.73-1.75 1.73zm13.5 11.27h-3v-5.5c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.91v5.61h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62v5.56z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#071C1C] text-white px-4 sm:px-8 mt-24">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-6 py-12 md:py-20 flex flex-col gap-10">
        {/* Top Row */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-8">
          {/* Logo */}
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-11 h-11 object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-6 md:gap-12 items-center justify-center text-sm font-bold text-center w-full">
            {[
              "For designers",
              "Hire talent",
              "Inspiration",
              "Advertising",
              "Blog",
              "About",
              "Careers",
              "Support",
            ].map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4 items-center w-full md:w-auto">
            {socialIcons.map(({ name, href, svg }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="hover:opacity-80 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-t border-white/10 pt-8 text-center">
          {/* Left Links */}
          <div className="flex flex-wrap gap-4 items-center text-white/60 text-sm font-normal justify-center w-full md:w-auto">
            <span>© 2025</span>
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
          {/* Right Links */}
          <div className="flex flex-wrap gap-4 items-center text-white/60 text-sm font-normal justify-center w-full md:w-auto">
            <span>Jobs</span>
            <span>Designers</span>
            <span>Freelancers</span>
            <span>Tags</span>
            <span>Places</span>
            <span>Resources</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
