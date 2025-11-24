import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon, SparklesIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const testimonials = [
  {
    type: "shopper",
    quote: "I discovered 5 new boutiques in my area I never knew existed!",
    text: `The map feature is genius. I found this amazing vintage store just 2 blocks away from my apartment. Saved over 10 items to my list and bought 3 already. Best shopping experience ever!`,
    author: "Emma L.",
    role: "Fashion Enthusiast",
    location: "Oslo",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    type: "owner",
    quote: "Our foot traffic increased 60% in just 2 months!",
    text: `In Store connected us with exactly the customers we wanted to reach. Setting up was ridiculously easy - took me 15 minutes. Now we get 5-10 new customers daily from the platform. Worth every krone!`,
    author: "Kristine A.",
    role: "Boutique Owner",
    location: "Bergen Style Studio",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    type: "shopper",
    quote: "Finally, shopping local is easier than shopping online!",
    text: `I used to scroll through Instagram for hours. Now I browse In Store, find what I love, and can actually try it on in-store the same day. The favorites list feature? Absolute lifesaver!`,
    author: "Sofia H.",
    role: "Local Shopper",
    location: "Trondheim",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

const Testimonial = () => {
  return (
    <section className="relative w-full px-4 py-20 md:py-28 bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header - More Impact */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-pink-200 shadow-sm">
            <SparklesIcon className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-bold text-pink-900 uppercase tracking-wide">
              Real Stories, Real Results
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">thousands</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join shoppers and stores transforming local shopping
          </p>
        </div>

        {/* Testimonials Grid - Bento Box Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`
                group relative
                bg-white/90 backdrop-blur-lg
                rounded-3xl
                p-8
                shadow-xl hover:shadow-2xl
                transition-all duration-300
                border-2 border-transparent
                hover:border-pink-300
                hover:-translate-y-2
                ${idx === 1 ? 'lg:scale-105' : ''}
              `}
            >
              {/* Type Badge */}
              <div className={`
                absolute -top-3 -right-3 
                ${t.type === 'owner' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-pink-600 to-rose-600'} 
                text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg
                flex items-center gap-2
              `}>
                {t.type === 'owner' ? (
                  <ShoppingBagIcon className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
                {t.type === 'owner' ? 'Store Owner' : 'Shopper'}
              </div>

              {/* 5 Stars - Large */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                ))}
              </div>

              {/* Main Quote - Bold & Large */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                "{t.quote}"
              </h3>

              {/* Supporting Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-pink-100 flex-shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {t.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t.role} • {t.location}
                  </div>
                </div>
              </div>

              {/* Decorative corner gradient */}
              <div className={`
                absolute bottom-0 right-0 w-32 h-32 
                ${t.type === 'owner' ? 'bg-gradient-to-tl from-purple-200' : 'bg-gradient-to-tl from-pink-200'} 
                rounded-tl-full opacity-20 pointer-events-none
              `}></div>
            </div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-xl">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Local Stores</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600 font-medium">Happy Shoppers</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Cities</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">4.9★</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
