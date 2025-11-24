"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
    XMarkIcon, 
    FunnelIcon, 
    ChevronDownIcon,
    HeartIcon as HeartOutlineIcon,
    CheckIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product }) => {
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === product.id));
    }, [product.id]);

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
                
                {/* Favorite Button */}
                <button
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
                </button>

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
                    {/* Left Side: Product Name & Price on same line */}
                    <div className="flex items-baseline gap-2 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                            {product.productName}
                        </h3>
                        <p className="text-sm font-semibold text-red-500 whitespace-nowrap">
                            kr. {product.price},-
                        </p>
                    </div>

                    {/* Right Side: Location Icon */}
                    <div className="flex-shrink-0 ml-2">
                        <MapPinIcon className="w-6 h-6 text-black" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- KATEGORIER: Sliding Category Pills with Connector ---
const CategoryFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState('klaer');
    const scrollContainerRef = useRef(null);
    const categories = [
        { id: 'klaer', label: 'Klær', subLabel: 'Alle Klær' },
        { id: 'sko', label: 'Sko', subLabel: 'Alle Sko' },
        { id: 'vesker', label: 'Vesker', subLabel: 'Alle Vesker' },
        { id: 'tilbehor', label: 'Tilbehør', subLabel: 'Alle Tilbehør' },
        { id: 'yttertoy', label: 'Yttertøy', subLabel: 'Alt Yttertøy' },
    ];

    useEffect(() => {
        const activeElement = scrollContainerRef.current?.querySelector(`[data-active='true']`);
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, [selectedCategory]);

    return (
        <div className="mb-6 pb-6 border-b border-gray-200">
            <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider">KATEGORIER</h4>
            <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-2 -mb-2 no-scrollbar">
                {categories.map(cat => {
                    const isActive = selectedCategory === cat.id;
                    return (
                        <div
                            key={cat.id}
                            data-active={isActive}
                            className="relative flex-shrink-0 flex items-stretch h-10 cursor-pointer"
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <div className={`px-4 flex items-center text-sm font-medium rounded-l border border-r-0 transition-colors ${isActive ? 'border-orange-400 text-gray-800' : 'border-gray-300 text-gray-700'}`}>
                                {cat.label}
                            </div>
                            <div className="relative w-[11px]">
                                <div className={`absolute inset-0 transition-colors ${isActive ? 'bg-orange-400' : 'bg-gray-300'}`} style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                            </div>
                            <div className={`pl-6 pr-4 flex items-center text-sm font-medium rounded-r border border-l-0 transition-colors ${isActive ? 'border-orange-400 text-orange-600' : 'border-gray-300 text-gray-500'}`}>
                                {cat.subLabel}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- FILTER SIDEBAR ---
const FilterSidebar = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [sortBy, setSortBy] = useState('mest-populaere');
    const [selectedColors, setSelectedColors] = useState([]);
    const [price, setPrice] = useState(23795);
    const [brandSearch, setBrandSearch] = useState('');
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [isColorOpen, setIsColorOpen] = useState(true);
    const [isMaterialOpen, setIsMaterialOpen] = useState(true);

    const resetAllFilters = () => {
        setSortBy('mest-populaere');
        setSelectedColors([]);
        setPrice(23795);
        setBrandSearch('');
        setSelectedMaterials([]);
    };
    
    const handleColorToggle = color => setSelectedColors(p => p.includes(color) ? p.filter(c => c !== color) : [...p, color]);
    const handleMaterialToggle = material => setSelectedMaterials(p => p.includes(material) ? p.filter(m => m !== material) : [...p, material]);

    return (
        <aside className={`font-sans ${isOpen ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'} lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-72 lg:flex-shrink-0 lg:p-0`}>
            {/* Mobile close button */}
            <div className="lg:hidden flex justify-end mb-4">
                <button onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            {/* 1. Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-gray-700 text-2xl hover:text-black">&#x2190;</button>
                    <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
                </div>
                <button onClick={resetAllFilters} className="text-xs text-gray-600 hover:text-black font-semibold uppercase tracking-wider">NULLSTILL ALLE FILTRE</button>
            </div>

            {/* 2. Sorter Etter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider">SORTER ETTER</h4>
                <div className="flex gap-2">
                    {[{v: 'mest-populaere', l: 'Mest Populære'}, {v: 'nyheter', l: 'Nyheter'}, {v: 'laveste-pris', l: 'Laveste Pris'}].map(item => (
                        <button key={item.v} onClick={() => setSortBy(item.v)} className={`px-3 py-1.5 text-sm rounded border ${sortBy === item.v ? 'border-orange-400 text-orange-600 font-medium' : 'border-gray-300 text-gray-600'}`}>
                            {item.l}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Kategorier */}
            <CategoryFilter />

            {/* 4. Farge */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button onClick={() => setIsColorOpen(!isColorOpen)} className="w-full flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">FARGE</h4>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isColorOpen ? 'rotate-180' : ''}`} />
                </button>
                {isColorOpen && <div className="flex gap-3 pt-2">{[{v:'svart',l:'Svart',c:'#2E2E2E'},{v:'brun',l:'Brun',c:'#8B4513'},{v:'beige',l:'Beige',c:'#F5DEB3'},{v:'graa',l:'Grå',c:'#A9A9A9'}].map(c => <div key={c.v} className="text-center"><button onClick={()=>handleColorToggle(c.v)}><div className={`w-10 h-10 rounded-full border-2 ${selectedColors.includes(c.v)?'border-orange-500':'border-transparent'}`} style={{backgroundColor:c.c}}></div></button><span className="text-xs text-gray-600 mt-1.5 block">{c.l}</span></div>)}</div>}
            </div>

            {/* 5. Pris */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider">PRIS</h4>
                <div className="text-center text-sm text-gray-700 mb-3">{38} kr – {price} kr</div>
                <input type="range" min="38" max="23795" value={price} onChange={e => setPrice(e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider" style={{'--thumb-position': `${((price - 38) / (23795 - 38)) * 100}%`}}/>
            </div>

            {/* 6. Merke */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2"><h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">MERKE</h4><span className="text-xs text-orange-500 font-medium">Liste</span></div>
                <input type="text" placeholder="Søk etter merke" value={brandSearch} onChange={e => setBrandSearch(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:border-gray-400"/>
            </div>

            {/* 7. Overmateriale */}
            <div className="mb-6">
                <button onClick={() => setIsMaterialOpen(!isMaterialOpen)} className="w-full flex items-center justify-between mb-3"><h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">OVERMATERIALE</h4><ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isMaterialOpen ? 'rotate-180' : ''}`} /></button>
                {isMaterialOpen && <div className="flex flex-wrap gap-2 pt-2">{['Annet','Blonde','Bomull','Cord'].map(m => <button key={m} onClick={() => handleMaterialToggle(m)} className={`px-3 py-1.5 text-sm rounded border ${selectedMaterials.includes(m)?'border-orange-400 text-orange-600 font-medium':'border-gray-300 text-gray-600'}`}>{m}</button>)}</div>}
            </div>
        </aside>
    );
};

// --- MAIN SHOP PAGE ---
export default function ShopPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const products = [
        {id:1,productName:"Leather Jacket",storeName:"Style Studio Oslo",price:"1 499",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",slug:"leather-jacket-1"},
        {id:2,productName:"Summer Dress",storeName:"Fashion Boutique",price:"2 299",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",slug:"summer-dress-1"},
        {id:3,productName:"Suede Shoes",storeName:"Urban Style",price:"899",image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",slug:"suede-shoes-1"},
        {id:4,productName:"Wool Coat",storeName:"Nordic Fashion",price:"3 499",image:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=600&fit=crop",slug:"wool-coat-1"}
    ];

    return (
        <>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar{display:none;}
                .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
                .range-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;background:white;border:2px solid #D1D5DB;cursor:pointer;border-radius:50%;margin-top:-7px;}
                .range-slider{background:linear-gradient(to right, #F97316 0%, #F97316 var(--thumb-position, 100%), #E5E7EB var(--thumb-position, 100%), #E5E7EB 100%);}
            `}</style>
            
            <div className="min-h-screen bg-white">
                {/* Mobile Filter Button */}
                <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
                    <button onClick={()=>setIsSidebarOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium w-full justify-center text-sm">
                        <FunnelIcon className="w-4 h-4"/>
                        Filter
                    </button>
                </div>

                <div className="max-w-[1800px] mx-auto px-4 lg:px-8 py-8">
                    <div className="flex gap-0 lg:gap-12">
                        {/* Filter Sidebar */}
                        <FilterSidebar isOpen={isSidebarOpen} onClose={()=>setIsSidebarOpen(false)}/>
                        
                        {/* Main Content */}
                        <main className="flex-1">
                            <div className="mb-6 text-center lg:text-left">
                                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Alle Produkter</h1>
                                <p className="text-sm text-gray-600">{products.length} produkter</p>
                            </div>
                            
                            {/* Product Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
