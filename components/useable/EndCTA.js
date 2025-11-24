"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { 
  ShoppingBagIcon, 
  BuildingStorefrontIcon, 
  SparklesIcon, 
  MapPinIcon, 
  HeartIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-24 px-4 overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-5 py-2.5 rounded-full mb-6 border border-pink-200/50 shadow-sm">
            <SparklesIcon className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-bold text-pink-900 uppercase tracking-wide">
              Get Started Today
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ready to transform <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              local shopping?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're a shopper or a store owner, In Store has something special for you
          </p>
        </div>

        {/* Dual CTA Cards - Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* CTA 1: Browse Products (For Shoppers) */}
          <div className="group relative bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl p-10 shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/50">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBagIcon className="w-9 h-9 text-white" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <HeartIcon className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  For Shoppers
                </span>
              </div>

              {/* Title */}
              <h3 className="text-4xl font-bold text-white mb-4">
                Discover Local Style
              </h3>

              {/* Description */}
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Browse products from local boutiques, save your favorites, and find exactly where to buy them on the map.
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {[
                  "Browse 10,000+ products",
                  "Save favorites without login",
                  "Find stores near you",
                  "100% free to use"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/90">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/products')}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white hover:bg-gray-100 text-pink-600 font-bold text-lg rounded-xl shadow-xl transition-all duration-200 transform hover:scale-105 group-hover:shadow-2xl"
              >
                Browse Products
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CTA 2: Register as Advertiser (For Store Owners) */}
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/50">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BuildingStorefrontIcon className="w-9 h-9 text-white" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <MapPinIcon className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  For Store Owners
                </span>
              </div>

              {/* Title */}
              <h3 className="text-4xl font-bold text-white mb-4">
                Reach Your Customers
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Create stunning ads in minutes, showcase your products, and connect with style-conscious shoppers in your area.
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {[
                  "Free during test phase",
                  "Up to 25 active ads",
                  "Easy setup in 15 minutes",
                  "Reach thousands of shoppers"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/register-advertiser')}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-xl transition-all duration-200 transform hover:scale-105 group-hover:shadow-2xl"
              >
                Register Your Store
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-gray-600 font-medium">Local Stores</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-1">10K+</div>
            <div className="text-gray-600 font-medium">Active Shoppers</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-gray-600 font-medium">Cities</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-1">FREE</div>
            <div className="text-gray-600 font-medium">Test Phase</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
