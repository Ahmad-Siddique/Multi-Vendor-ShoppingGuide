"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
    HeartIcon as HeartOutlineIcon,
    ArrowDownTrayIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

// Inline Map Component
const InlineMapComponent = ({ coordinates, storeName, address }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        import('leaflet').then((L) => {
            import('leaflet/dist/leaflet.css');

            map.current = L.map(mapContainer.current).setView(coordinates, 16);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map.current);

            const customIcon = L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            const marker = L.marker(coordinates, { icon: customIcon }).addTo(map.current);
            marker.bindPopup(`
                <div style="text-align: center; font-family: sans-serif;">
                    <h4 style="font-weight: bold; color: #111827; margin-bottom: 0.25rem;">${storeName}</h4>
                    <p style="font-size: 0.875rem; color: #4b5563;">${address}</p>
                </div>
            `).openPopup();
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [coordinates, storeName, address]);

    return (
        <div 
            ref={mapContainer} 
            className="w-full h-96 rounded-xl border-2 border-gray-200 shadow-lg"
            style={{ zIndex: 1 }}
        />
    );
};

// Main Product Page Component
export default function ProductDetailPage() {
    const router = useRouter();

    // Demo product data
    const product = {
        id: 1,
        name: "Leather Jacket",
        price: "1 499",
        views: 1234,
        description: "Premium leather jacket handcrafted with finest Italian leather. Perfect for any occasion, this timeless piece combines elegance with comfort. Features include genuine leather construction, adjustable waist belt, and durable hardware.",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
        ],
        store: {
            name: "Style Studio Oslo",
            address: "Bygdøy Allé 2, 0262 Oslo, Norway",
            email: "info@stylestudio.no",
            phone: "+47 22 12 34 56",
            website: "www.stylestudio.no",
            description: "Premium fashion boutique specializing in handcrafted leather goods and designer apparel.",
            coordinates: [59.9139, 10.6842]
        },
        category: "Klær",
        color: "Svart",
        material: "Genuine Leather",
        size: "One Size",
        more_products: [
            { id: 2, name: "Wool Coat", price: "2 899", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop" },
            { id: 3, name: "Silk Scarf", price: "599", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=400&fit=crop" },
            { id: 4, name: "Leather Shoes", price: "1 299", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop" },
        ]
    };

    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === product.id));
    }, [product.id]);

    const handleFavoriteClick = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            favorites = favorites.filter(fav => fav.id !== product.id);
        } else {
            favorites.push(product);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.href = product.images[selectedImage];
        link.download = `${product.name}-${selectedImage + 1}.jpg`;
        link.click();
    };

    const handleShare = () => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const handlePrevImage = () => {
        setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Product Container */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left: Image Gallery */}
                    <div className="flex gap-4">
                        {/* Main Image */}
                        <div className="flex-1">
                            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg group">
                                <img 
                                    id={`product-image-${selectedImage}`}
                                    src={product.images[selectedImage]} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Vertical Dots - Inside Top Left */}
                                <div className="absolute top-4 left-4 flex flex-col gap-3 z-10">
                                    {product.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                selectedImage === idx 
                                                    ? 'bg-white w-3 h-3' 
                                                    : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Previous Button */}
                                {product.images.length > 1 && (
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                )}

                                {/* Next Button */}
                                {product.images.length > 1 && (
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Next image"
                                    >
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                                            selectedImage === idx 
                                                ? 'border-gray-900 shadow-md' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* All 5 Action Buttons - Right Side of Image */}
                        <div className="flex flex-col gap-3 justify-start pt-4">
                            {/* 1. Add to Favorites */}
                            <button
                                onClick={handleFavoriteClick}
                                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                                title="Add to Favorites"
                            >
                                {isFavorite ? (
                                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                                ) : (
                                    <HeartOutlineIcon className="w-5 h-5 text-gray-700" />
                                )}
                            </button>

                            {/* 2. Description */}
                            <button
                                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                                title="Product Description"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </button>

                            {/* 3. Store Information */}
                            <button
                                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                                title="Store Information"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </button>

                            {/* 4. Share Product */}
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-colors relative"
                                title="Share Product"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.589 12.438 10.158 11.1 10.158 9.6a3.6 3.6 0 00-7.2 0c0 1.5.569 2.838 1.474 3.742m0 0l4.474 4.474m0 0l2.121-2.121m-5.595 5.595L4.5 21h12" />
                                </svg>
                                {copySuccess && (
                                    <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                        Copied!
                                    </span>
                                )}
                            </button>

                            {/* 5. Download Picture */}
                            <button
                                onClick={handleDownloadImage}
                                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                                title="Download Picture"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-bold text-red-600">kr. {product.price},-</p>
                                <div className="flex items-center gap-1 text-gray-600">
                                    <EyeIcon className="w-4 h-4" />
                                    <span className="text-sm">{product.views} views</span>
                                </div>
                            </div>
                        </div>

                        {/* Store Info Preview */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Available at</p>
                            <h3 className="text-xl font-bold text-gray-900">{product.store.name}</h3>
                            <p className="text-sm text-gray-600 mt-2 flex items-start gap-2">
                                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {product.store.address}
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Product Details</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Product Specs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Category</p>
                                <p className="text-base font-semibold text-gray-900">{product.category}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Color</p>
                                <p className="text-base font-semibold text-gray-900">{product.color}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Material</p>
                                <p className="text-base font-semibold text-gray-900">{product.material}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-wider">Size</p>
                                <p className="text-base font-semibold text-gray-900">{product.size}</p>
                            </div>
                        </div>

                        {/* Call to Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button className="flex-1 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-colors">
                                View Store
                            </button>
                            <button 
                                onClick={() => window.open(`https://www.google.com/maps/search/${product.store.address}`, '_blank')}
                                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors"
                            >
                                Find Store
                            </button>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Location</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Map */}
                        <InlineMapComponent 
                            coordinates={product.store.coordinates}
                            storeName={product.store.name}
                            address={product.store.address}
                        />

                        {/* Store Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.store.name}</h3>
                                <p className="text-gray-700 leading-relaxed">{product.store.description}</p>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 uppercase tracking-wider">Address</p>
                                        <p className="text-gray-900 font-medium">{product.store.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <PhoneIcon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 uppercase tracking-wider">Phone</p>
                                        <a href={`tel:${product.store.phone}`} className="text-gray-900 font-medium hover:text-orange-600 transition-colors">
                                            {product.store.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <EnvelopeIcon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 uppercase tracking-wider">Email</p>
                                        <a href={`mailto:${product.store.email}`} className="text-gray-900 font-medium hover:text-orange-600 transition-colors">
                                            {product.store.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <GlobeAltIcon className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 uppercase tracking-wider">Website</p>
                                        <a href={`https://${product.store.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium hover:text-orange-600 transition-colors">
                                            {product.store.website}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More from Store Section */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">More from {product.store.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {product.more_products.map(prod => (
                            <div 
                                key={prod.id} 
                                className="group cursor-pointer"
                                onClick={() => router.push(`/products/${prod.id}`)}
                            >
                                <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 shadow-md">
                                    <img 
                                        src={prod.image} 
                                        alt={prod.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">{prod.name}</h4>
                                <p className="text-red-600 font-bold">kr. {prod.price},-</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
