"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Two-column layout: Content Left, Visual Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-12 lg:py-20">
          
          {/* LEFT SIDE - Content */}
          <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
            {/* Badge/Label */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 rounded-full w-fit border border-pink-200">
              <SparklesIcon className="w-5 h-5 text-pink-600" />
              <span className="text-sm font-semibold text-pink-900">
                Style-Conscious Shopping Platform
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-4">
                Find Your Style
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600">
                  Near You
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Discover products from local stores tailored to your unique style. 
                Browse, save favorites, and shop directly from boutiques in your area.
              </p>
            </div>

            {/* Search Bar - Simplified & Modern */}
            <div className="relative w-full max-w-xl">
              <div className="flex items-stretch bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all hover:border-pink-400 hover:shadow-xl">
                <div className="flex items-center pl-5 pr-3">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, stores, styles..."
                  className="flex-1 py-4 px-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                />
                <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-4 transition-all duration-200 transform hover:scale-[1.02]">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Category Pills */}
            <div className="flex flex-wrap gap-3">
              {['Jackets', 'Dresses', 'Shoes', 'Accessories'].map((category) => (
                <button
                  key={category}
                  onClick={() => router.push(`/products?category=${category.toLowerCase()}`)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-pink-900 rounded-full font-medium text-sm transition-colors duration-200 border border-transparent hover:border-pink-300"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => router.push('/products')}
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 text-base"
              >
                Browse All Products
              </button>
              <button
                onClick={() => router.push('/register-advertiser')}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl shadow-lg border-2 border-gray-900 transition-all duration-200 transform hover:scale-105 text-base"
              >
                I'm a Store Owner
              </button>
            </div>

            {/* Stats/Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Local Stores</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-600">Cities</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Hero Visual */}
          <div className="relative order-1 lg:order-2">
            {/* Main Hero Image Container */}
            <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-pink-400/20 z-10"></div>
              
              {/* Replace with actual product/model image */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300">
                {/* Placeholder - Replace with <Image> component */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-white text-2xl font-semibold">Hero Image</p>
                  {/* <Image 
                    src="/hero-fashion-model.jpg" 
                    alt="Fashion model showcasing style" 
                    fill 
                    className="object-cover"
                    priority
                  /> */}
                </div>
              </div>

              {/* Floating Product Card Example */}
              <div className="absolute bottom-8 left-8 right-8 z-20 bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-2xl border border-white/50">
                <div className="flex items-center gap-4">
                  {/* Mini product image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0"></div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                      Designer Jacket
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Style Studio Oslo</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">kr. 1,499</span>
                      <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
                        <HeartIcon className="w-5 h-5 text-pink-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Badge */}
              <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-semibold text-gray-900">Oslo</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave/Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}
