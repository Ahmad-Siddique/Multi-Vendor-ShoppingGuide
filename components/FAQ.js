"use client";
import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Is In Store free to use?",
    answer:
      "Yes! During our test phase, In Store is completely free for both shoppers and store owners. Stores can create and manage ads at no cost, and shoppers can browse and save favorites without any fees.",
    icon: "💰"
  },
  {
    question: "How do I register my store as an advertiser?",
    answer:
      "Simply click 'Register as Advertiser' and sign up with your email and password. Once registered, you can immediately start creating ads with images, product descriptions, prices, and your store location on the map.",
    icon: "🏪"
  },
  {
    question: "How many ads can I create for my store?",
    answer:
      "Each store can have up to 10 active ads at a time. Ads are automatically published for 30 days, after which you can renew, edit, or delete them from your dashboard.",
    icon: "📢"
  },
  {
    question: "How does the favorites list work?",
    answer:
      "Shoppers can add products to their favorites list by clicking the heart icon on any product. No login required! Your list is saved in your browser and you can print it, download as PDF, or email it to yourself.",
    icon: "❤️"
  },
  {
    question: "Can shoppers purchase products directly through In Store?",
    answer:
      "No, In Store is a discovery platform. Shoppers browse products, save favorites, and see store locations on the map. They then visit the physical store to make purchases.",
    icon: "🛍️"
  },
  {
    question: "How does the map feature work?",
    answer:
      "When stores create ads, they enter their address which automatically pins their location on Google Maps. Shoppers can see exactly where each store is located and find nearby boutiques easily.",
    icon: "📍"
  },
  {
    question: "What happens after 30 days to my ads?",
    answer:
      "Ads are automatically archived after 30 days. You can easily renew, edit, or delete ads from your advertiser dashboard.",
    icon: "📅"
  },
  {
    question: "Do I need to create an account to browse products?",
    answer:
      "No! Shoppers can browse products, use filters, view maps, and even save favorites without creating an account. Registration is only required for store owners who want to create ads.",
    icon: "👤"
  },
];

const PlusIcon = ({ open }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
  >
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-pink-50/30 to-white py-24 px-4 overflow-hidden">
      
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header with Flair */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-5 py-2.5 rounded-full mb-6 border border-pink-200/50 shadow-sm">
            <SparklesIcon className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-bold text-pink-900 uppercase tracking-wide">
              Your Questions Answered
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Frequently Asked <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Questions
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about shopping and selling on In Store
          </p>
        </div>

        {/* FAQ Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`
                group
                border-2 rounded-2xl overflow-hidden 
                bg-white
                transition-all duration-300
                ${
                  openIdx === idx
                    ? "border-pink-400 shadow-lg shadow-pink-100"
                    : "border-gray-200 hover:border-pink-300 hover:shadow-md"
                }
              `}
            >
              <button
                className="w-full flex items-start gap-4 px-6 py-5 text-left focus:outline-none"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIdx === idx}
              >
                {/* Icon */}
                <span className="text-3xl flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                  {faq.icon}
                </span>
                
                {/* Question */}
                <span className="flex-1 text-lg font-semibold text-gray-900 leading-snug">
                  {faq.question}
                </span>
                
                {/* Plus/Minus */}
                <span
                  className={`flex-shrink-0 mt-1 transition-colors duration-300 ${
                    openIdx === idx ? "text-pink-600" : "text-gray-400 group-hover:text-pink-500"
                  }`}
                >
                  <PlusIcon open={openIdx === idx} />
                </span>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIdx === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                <div className="px-6 pb-6 pl-[4.5rem] text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA - Enhanced */}
        {/* <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative text-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
              Can't find what you're looking for? Our friendly support team is ready to help you out.
            </p>
            
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl shadow-xl transition-all duration-200 transform hover:scale-105 text-lg">
              Contact Support →
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;
