"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    HeartIcon as HeartOutlineIcon, 
    CheckIcon,
    MapPinIcon  // ← Using the proper Heroicons map pin
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

// Reusable Product Card Component
const ProductCard = ({ product }) => {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAdded, setShowAdded] = useState(false);

    // Sync favorite state with localStorage on mount
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === product.id));
    }, [product.id]);

    // Handle favorite button click
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isCurrentlyFavorite = favorites.some(fav => fav.id === product.id);
        
        if (isCurrentlyFavorite) {
            favorites = favorites.filter(fav => fav.id !== product.id);
            setIsFavorite(false);
        } else {
            favorites.push(product);
            setIsFavorite(true);
            setShowAdded(true);
            setTimeout(() => setShowAdded(false), 2000);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    return (
        <div 
            className="group cursor-pointer font-sans"
            onClick={() => router.push(`/products/${product.slug}`)}
        >
            {/* Product Image Container */}
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3">
                <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Favorite Button - Uncomment if needed */}
                {/* <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-110"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {showAdded ? (
                        <CheckIcon className="w-5 h-5 text-green-600" />
                    ) : isFavorite ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                        <HeartOutlineIcon className="w-5 h-5 text-gray-700" />
                    )}
                </button> */}

                {/* "Added!" Tooltip */}
                {showAdded && (
                    <div className="absolute top-14 right-3 bg-gray-800 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg transition-opacity duration-300">
                        Added!
                    </div>
                )}
            </div>

            {/* Product Info Section */}
            <div className="px-1">
                {/* Store Name */}
                <p className="text-sm text-gray-600 mb-1 truncate">
                    {product.storeName}
                </p>
                
                <div className="flex items-center justify-between">
                    {/* Left Side: Product Name & Price */}
                    <div className="flex items-baseline gap-2 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                            {product.productName}
                        </h3>
                        <p className="text-sm font-semibold text-red-500 whitespace-nowrap">
                            kr. {product.price},-
                        </p>
                    </div>

                    {/* Right Side: Location Icon - Clean Heroicons version */}
                    <div className="flex-shrink-0 ml-2">
                        <MapPinIcon className="w-6 h-6 text-black" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Example Usage in a Grid ---
export default function ProductGrid() {
    const router = useRouter();
    
    const demoProducts = [
        { id: 1, productName: "Leather Jacket", storeName: "Style Studio Oslo", price: "1 499", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop", slug: "leather-jacket-1" },
        { id: 2, productName: "Summer Dress", storeName: "Fashion Boutique", price: "2 299", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop", slug: "summer-dress-1" },
        { id: 3, productName: "Suede Shoes", storeName: "Urban Style", price: "899", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop", slug: "suede-shoes-1" },
    ];

    return (
        <section className="max-w-7xl w-full mx-auto px-4 md:px-8 py-16 bg-white">
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
                    What's Popular Now
                </h2>
                <p className="text-gray-600 text-lg">
                    Discover trending products from local stores
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10 mb-12">
                {demoProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={() => router.push('/shop')}
                    className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105"
                >
                    Browse All Products
                </button>
            </div>
        </section>
    );
}
