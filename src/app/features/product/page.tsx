// 'use client'

// import { useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'

// type Product = {
//   id: number
//   title: string
//   brand: string
//   price: number
//   category: string
//   images: string[]
//   thumbnail?: string
//   rating: number
//   stock: number
// }

// export default function Page() {
//   const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([])
//   const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'popularity'>('default') // Made this state variable
//   const [categoryFilter, setCategoryFilter] = useState('')
//   const [brandFilter, setBrandFilter] = useState('')
//   const [categories, setCategories] = useState<string[]>([])
//   const [brands, setBrands] = useState<string[]>([])

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.products)

//         const allCategories = data.products.map((product: Product) => product.category)
//         const uniqueCategories = Array.from(new Set(allCategories)) as string[]
        
//         const allBrands = data.products.map((product: Product) => product.brand)
//         const uniqueBrands = Array.from(new Set(allBrands)) as string[]

//         setCategories(uniqueCategories)
//         setBrands(uniqueBrands)
//       })
//       .catch(err => console.error(err))
//   }, [])

//   const getFilteredProducts = () => {
//     let list = [...products]

    
//     if (categoryFilter) list = list.filter(p => p.category === categoryFilter)
//     if (brandFilter) list = list.filter(p => p.brand === brandFilter)

    
//     switch (sortBy) {
//       case 'price-low':
//         return list.sort((a, b) => a.price - b.price)
//       case 'price-high':
//         return list.sort((a, b) => b.price - a.price)
//       case 'popularity':        
//         return list.sort((a, b) => b.rating - a.rating) 
//       default:
//         return list
//     }
//   }

//   const displayedProducts = getFilteredProducts()

//   const navCategories = ['All', 'Men', 'Women', 'Electronics']

//   return (
//     <div className="container mx-auto py-8 p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center text-blue-400">Our Products</h1>

//       <div className="flex justify-center space-x-4 mb-6">
//         {navCategories.map(cat => (
//           <button
//             key={cat}
//             className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
//               categoryFilter === cat.toLowerCase() || (cat === 'All' && categoryFilter === '')
//                 ? 'bg-blue-400 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//             onClick={() => setCategoryFilter(cat === 'All' ? '' : cat.toLowerCase())}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-wrap mb-6 gap-4">
//         <select
//           className="border-2 text-blue-500 rounded-lg px-4 py-2 focus:outline-none cursor-pointer"
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat, idx) => (
//             <option key={idx} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <select
//           className="border-2 text-blue-500 rounded-lg px-4 py-2 focus:outline-none cursor-pointer"
//           value={brandFilter}
//           onChange={(e) => setBrandFilter(e.target.value)}
//         >
//           <option value="">All Brands</option>
//           {brands.map((brand, idx) => (
//             <option key={idx} value={brand}>{brand}</option>
//           ))}
//         </select>

     
//         <select
//           className="border-2 text-blue-500 rounded-lg px-4 py-2 focus:outline-none cursor-pointer"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
//         >
//           <option value="price-low">Price: Low → High</option>
//           <option value="price-high">Price: High → Low</option>
//           <option value="popularity">Sort By Popularity</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer space-y-5">
//         {displayedProducts.map(product => (
//           <div
//             key={product.id}
//             className="rounded-lg p-4 hover:shadow-lg border border-gray-200"
//             onClick={() => router.push(`/features/product/${product.id}`)}
//           >
//             <img
//               src={product.images?.[0] ?? product.thumbnail ?? ''}
//               alt={product.title}
//               className="w-full h-48 object-cover mb-2 rounded"
//             />
//             <h2 className="font-semibold text-lg">{product.title}</h2>
//             <p className="text-gray-600 font-bold">Brand: {product.brand}</p>
//             <div className="flex justify-between items-center">
//               <p className="text-gray-800 font-bold">Price: ${product.price}</p>
//               <div className="flex items-center">
//                 <div className="text-yellow-500">★</div>
//                 <div className="ml-1 text-gray-600">{product.rating?.toFixed(1)}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {displayedProducts.length === 0 && (
//         <p className="text-center text-gray-500 mt-10 text-lg">
//           No products found.
//         </p>
//       )}
//     </div>
//   )
// }



// 'use client'

// import { useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'

// type Product = {
//   id: number
//   title: string
//   brand: string
//   price: number
//   discountPercentage?: number
//   category: string
//   images: string[]
//   thumbnail?: string
//   rating: number
//   stock: number
// }

// export default function Page() {
//   const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'popularity'>('default')
//   const [categoryFilter, setCategoryFilter] = useState('')
//   const [brandFilter, setBrandFilter] = useState('')
//   const [categories, setCategories] = useState<string[]>([])
//   const [brands, setBrands] = useState<string[]>([])

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.products)

//         const allCategories = data.products.map((product: Product) => product.category)
//         const uniqueCategories = Array.from(new Set(allCategories)) as string[]

//         const allBrands = data.products.map((product: Product) => product.brand).filter(Boolean)
//         const uniqueBrands = Array.from(new Set(allBrands)) as string[]

//         setCategories(uniqueCategories)
//         setBrands(uniqueBrands)
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error(err)
//         setLoading(false)
//       })
//   }, [])

//   const getFilteredProducts = () => {
//     let list = [...products]

//     if (searchQuery.trim()) {
//       list = list.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))
//     }
//     if (categoryFilter) {
//       list = list.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
//     }
//     if (brandFilter) {
//       list = list.filter(p => p.brand === brandFilter)
//     }

//     switch (sortBy) {
//       case 'price-low':
//         return list.sort((a, b) => a.price - b.price)
//       case 'price-high':
//         return list.sort((a, b) => b.price - a.price)
//       case 'popularity':
//         return list.sort((a, b) => b.rating - a.rating)
//       default:
//         return list
//     }
//   }

//   const resetFilters = () => {
//     setSearchQuery('')
//     setCategoryFilter('')
//     setBrandFilter('')
//     setSortBy('default')
//   }

//   const displayedProducts = getFilteredProducts()
//   const navCategories = ['All', 'beauty', 'fragrances', 'furniture', 'groceries']

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
//       <div className="max-w-7xl mx-auto space-y-10">
        
//         {/* Hero Header */}
//         <header className="text-center space-y-4 max-w-2xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
//             <span>✨ Exclusive Catalog</span>
//           </div>
//           <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//             Discover Lifestyle
//           </h1>
//           <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
//             Browse our top-rated products with real-time filtering, instant search, and seamless navigation.
//           </p>
//         </header>

//         {/* Category Pill Tabs */}
//         <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
//           {navCategories.map(cat => {
//             const isActive = categoryFilter === cat.toLowerCase() || (cat === 'All' && categoryFilter === '')
//             return (
//               <button
//                 key={cat}
//                 onClick={() => setCategoryFilter(cat === 'All' ? '' : cat.toLowerCase())}
//                 className={`px-5 py-2.5 rounded-2xl text-xs font-semibold capitalize tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
//                   isActive
//                     ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
//                     : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
//                 }`}
//               >
//                 {cat}
//               </button>
//             )
//           })}
//         </div>

//         {/* Control Bar (Search, Filters, Sort) */}
//         <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-4 shadow-2xl flex flex-col lg:flex-row gap-4 justify-between items-center">
          
//           {/* Search Input */}
//           <div className="relative w-full lg:w-96">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2.5 pl-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
//             />
//             <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>

//           {/* Dropdown Filters */}
//           <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
//             {/* Category Select */}
//             <div className="relative flex-1 sm:flex-none">
//               <select
//                 className="w-full appearance-none bg-slate-950/80 border border-slate-800 text-slate-300 rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer capitalize"
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((cat, idx) => (
//                   <option key={idx} value={cat} className="bg-slate-900">{cat}</option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>

//             {/* Brand Select */}
//             <div className="relative flex-1 sm:flex-none">
//               <select
//                 className="w-full appearance-none bg-slate-950/80 border border-slate-800 text-slate-300 rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
//                 value={brandFilter}
//                 onChange={(e) => setBrandFilter(e.target.value)}
//               >
//                 <option value="">All Brands</option>
//                 {brands.map((brand, idx) => (
//                   <option key={idx} value={brand} className="bg-slate-900">{brand}</option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>

//             {/* Sort Select */}
//             <div className="relative flex-1 sm:flex-none">
//               <select
//                 className="w-full appearance-none bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 rounded-2xl px-4 py-2.5 pr-9 text-xs font-semibold focus:outline-none focus:border-indigo-400 transition-all cursor-pointer"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
//               >
//                 <option value="default" className="bg-slate-900">Sort by: Featured</option>
//                 <option value="price-low" className="bg-slate-900">Price: Low to High</option>
//                 <option value="price-high" className="bg-slate-900">Price: High to Low</option>
//                 <option value="popularity" className="bg-slate-900">Customer Rating</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-400">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Loading Skeletons */}
//         {loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-4 space-y-4 animate-pulse">
//                 <div className="aspect-square bg-slate-800/60 rounded-2xl" />
//                 <div className="h-4 bg-slate-800/80 rounded-md w-3/4" />
//                 <div className="h-3 bg-slate-800/50 rounded-md w-1/2" />
//                 <div className="flex justify-between items-center pt-2">
//                   <div className="h-5 bg-slate-800 rounded-md w-1/3" />
//                   <div className="h-5 bg-slate-800 rounded-md w-1/4" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Product Cards Grid */}
//         {!loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {displayedProducts.map((product) => (
//               <div
//                 key={product.id}
//                 onClick={() => router.push(`/features/product/${product.id}`)}
//                 className="group relative bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/50 rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-sm"
//               >
//                 <div>
//                   {/* Image & Badges */}
//                   <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-950/60 mb-4 border border-slate-800/50">
//                     <img
//                       src={product.images?.[0] ?? product.thumbnail ?? ''}
//                       alt={product.title}
//                       className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
//                     />
                    
//                     {/* Top Badges */}
//                     <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
//                       {product.category && (
//                         <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-800 capitalize">
//                           {product.category}
//                         </span>
//                       )}
//                       {product.discountPercentage && (
//                         <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md">
//                           -{Math.round(product.discountPercentage)}%
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Product Details */}
//                   <h2 className="font-semibold text-slate-100 text-sm group-hover:text-indigo-400 transition-colors line-clamp-1">
//                     {product.title}
//                   </h2>
//                   <p className="text-xs text-slate-500 font-medium mb-4 mt-1">
//                     {product.brand ? `by ${product.brand}` : 'Generic'}
//                   </p>
//                 </div>

//                 {/* Footer / Price & Rating */}
//                 <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
//                   <div className="flex flex-col">
//                     <span className="text-xs text-slate-500 font-medium">Price</span>
//                     <span className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
//                       ${product.price}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
//                     <span className="text-amber-400 text-xs">★</span>
//                     <span className="text-xs font-bold text-amber-300">
//                       {product.rating?.toFixed(1)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty Search State */}
//         {!loading && displayedProducts.length === 0 && (
//           <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
//             <div className="text-5xl">🛍️</div>
//             <h3 className="text-lg font-bold text-slate-200">No products matched your search</h3>
//             <p className="text-xs text-slate-400">
//               Try adjusting your category selections, search query, or clear your filters to explore more catalog items.
//             </p>
//             <button
//               onClick={resetFilters}
//               className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   )
// }




// 'use client'

// import { useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'

// type Product = {
//   id: number
//   title: string
//   brand: string
//   price: number
//   discountPercentage?: number
//   category: string
//   images: string[]
//   thumbnail?: string
//   rating: number
//   stock: number
// }

// export default function Page() {
//   const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [isDark, setIsDark] = useState(true) // Theme State

//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'popularity'>('default')
//   const [categoryFilter, setCategoryFilter] = useState('')
//   const [brandFilter, setBrandFilter] = useState('')
//   const [categories, setCategories] = useState<string[]>([])
//   const [brands, setBrands] = useState<string[]>([])

//   // Load saved theme preference on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme')
//     if (savedTheme) {
//       setIsDark(savedTheme === 'dark')
//     }
//   }, [])

//   // Toggle Theme Handler
//   const toggleTheme = () => {
//     setIsDark(prev => {
//       const nextTheme = !prev
//       localStorage.setItem('theme', nextTheme ? 'dark' : 'light')
//       return nextTheme
//     })
//   }

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.products)

//         const allCategories = data.products.map((product: Product) => product.category)
//         const uniqueCategories = Array.from(new Set(allCategories)) as string[]

//         const allBrands = data.products.map((product: Product) => product.brand).filter(Boolean)
//         const uniqueBrands = Array.from(new Set(allBrands)) as string[]

//         setCategories(uniqueCategories)
//         setBrands(uniqueBrands)
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error(err)
//         setLoading(false)
//       })
//   }, [])

//   const getFilteredProducts = () => {
//     let list = [...products]

//     if (searchQuery.trim()) {
//       list = list.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))
//     }
//     if (categoryFilter) {
//       list = list.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
//     }
//     if (brandFilter) {
//       list = list.filter(p => p.brand === brandFilter)
//     }

//     switch (sortBy) {
//       case 'price-low':
//         return list.sort((a, b) => a.price - b.price)
//       case 'price-high':
//         return list.sort((a, b) => b.price - a.price)
//       case 'popularity':
//         return list.sort((a, b) => b.rating - a.rating)
//       default:
//         return list
//     }
//   }

//   const resetFilters = () => {
//     setSearchQuery('')
//     setCategoryFilter('')
//     setBrandFilter('')
//     setSortBy('default')
//   }

//   const displayedProducts = getFilteredProducts()
//   const navCategories = ['All', 'beauty', 'fragrances', 'furniture', 'groceries']

//   return (
//     <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
//       isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
//     }`}>
//       <div className="max-w-7xl mx-auto space-y-10">
        
//         {/* Top Bar with Theme Toggle */}
//         <div className="flex justify-end items-center">
//           <button
//             onClick={toggleTheme}
//             className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
//               isDark 
//                 ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
//                 : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
//             }`}
//           >
//             <span>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
//           </button>
//         </div>

//         {/* Hero Header */}
//         <header className="text-center space-y-4 max-w-2xl mx-auto">
//           <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${
//             isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
//           }`}>
//             <span>✨ Exclusive Catalog</span>
//           </div>
//           <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
//             isDark 
//               ? 'bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
//               : 'text-slate-900'
//           }`}>
//             Discover Tech & Lifestyle
//           </h1>
//           <p className={`text-sm sm:text-base font-normal leading-relaxed ${
//             isDark ? 'text-slate-400' : 'text-slate-600'
//           }`}>
//             Browse our top-rated products with real-time filtering, instant search, and seamless navigation.
//           </p>
//         </header>

//         {/* Category Pill Tabs */}
//         <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
//           {navCategories.map(cat => {
//             const isActive = categoryFilter === cat.toLowerCase() || (cat === 'All' && categoryFilter === '')
//             return (
//               <button
//                 key={cat}
//                 onClick={() => setCategoryFilter(cat === 'All' ? '' : cat.toLowerCase())}
//                 className={`px-5 py-2.5 rounded-2xl text-xs font-semibold capitalize tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
//                   isActive
//                     ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
//                     : isDark
//                       ? 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
//                       : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
//                 }`}
//               >
//                 {cat}
//               </button>
//             )
//           })}
//         </div>

//         {/* Control Bar (Search, Filters, Sort) */}
//         <div className={`backdrop-blur-xl border rounded-3xl p-4 shadow-2xl flex flex-col lg:flex-row gap-4 justify-between items-center transition-colors ${
//           isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
//         }`}>
          
//           {/* Search Input */}
//           <div className="relative w-full lg:w-96">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={`w-full border rounded-2xl px-4 py-2.5 pl-10 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
//                 isDark 
//                   ? 'bg-slate-950/80 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500' 
//                   : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500'
//               }`}
//             />
//             <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>

//           {/* Dropdown Filters */}
//           <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
//             {/* Category Select */}
//             <div className="relative flex-1 sm:flex-none">
//               <select
//                 className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer capitalize ${
//                   isDark 
//                     ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
//                     : 'bg-slate-50 border-slate-200 text-slate-700'
//                 }`}
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((cat, idx) => (
//                   <option key={idx} value={cat} className={isDark ? 'bg-slate-900' : 'bg-white'}>{cat}</option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>

//             {/* Brand Select */}
//             <div className="relative flex-1 sm:flex-none">
//               <select
//                 className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer ${
//                   isDark 
//                     ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
//                     : 'bg-slate-50 border-slate-200 text-slate-700'
//                 }`}
//                 value={brandFilter}
//                 onChange={(e) => setBrandFilter(e.target.value)}
//               >
//                 <option value="">All Brands</option>
//                 {brands.map((brand, idx) => (
//                   <option key={idx} value={brand} className={isDark ? 'bg-slate-900' : 'bg-white'}>{brand}</option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>

//             {/* Sort Select */}
//             <div className="relative flex-1 sm:flex-none">
//               <select
//                 className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-semibold focus:outline-none focus:border-indigo-400 transition-all cursor-pointer ${
//                   isDark 
//                     ? 'bg-indigo-950/50 border-indigo-500/30 text-indigo-300' 
//                     : 'bg-indigo-50 border-indigo-200 text-indigo-700'
//                 }`}
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
//               >
//                 <option value="default" className={isDark ? 'bg-slate-900' : 'bg-white'}>Sort by: Featured</option>
//                 <option value="price-low" className={isDark ? 'bg-slate-900' : 'bg-white'}>Price: Low to High</option>
//                 <option value="price-high" className={isDark ? 'bg-slate-900' : 'bg-white'}>Price: High to Low</option>
//                 <option value="popularity" className={isDark ? 'bg-slate-900' : 'bg-white'}>Customer Rating</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Loading Skeletons */}
//         {loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className={`border rounded-3xl p-4 space-y-4 animate-pulse ${
//                 isDark ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'
//               }`}>
//                 <div className={`aspect-square rounded-2xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-200'}`} />
//                 <div className={`h-4 rounded-md w-3/4 ${isDark ? 'bg-slate-800/80' : 'bg-slate-200'}`} />
//                 <div className={`h-3 rounded-md w-1/2 ${isDark ? 'bg-slate-800/50' : 'bg-slate-200'}`} />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Product Cards Grid */}
//         {!loading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {displayedProducts.map((product) => (
//               <div
//                 key={product.id}
//                 onClick={() => router.push(`/features/product/${product.id}`)}
//                 className={`group relative border rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-sm ${
//                   isDark 
//                     ? 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10' 
//                     : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300 hover:shadow-slate-200'
//                 }`}
//               >
//                 <div>
//                   {/* Image Wrap */}
//                   <div className={`relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border ${
//                     isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100 border-slate-200'
//                   }`}>
//                     <img
//                       src={product.images?.[0] ?? product.thumbnail ?? ''}
//                       alt={product.title}
//                       className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
//                     />
                    
//                     {/* Badges */}
//                     <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
//                       {product.category && (
//                         <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize backdrop-blur-md ${
//                           isDark 
//                             ? 'bg-slate-950/80 text-slate-300 border-slate-800' 
//                             : 'bg-white/90 text-slate-700 border-slate-200 shadow-2xs'
//                         }`}>
//                           {product.category}
//                         </span>
//                       )}
//                       {product.discountPercentage && (
//                         <span className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md">
//                           -{Math.round(product.discountPercentage)}%
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Title & Brand */}
//                   <h2 className={`font-semibold text-sm transition-colors line-clamp-1 ${
//                     isDark ? 'text-slate-100 group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'
//                   }`}>
//                     {product.title}
//                   </h2>
//                   <p className="text-xs text-slate-400 font-medium mb-4 mt-1">
//                     {product.brand ? `by ${product.brand}` : 'Generic'}
//                   </p>
//                 </div>

//                 {/* Price & Rating */}
//                 <div className={`pt-3 border-t flex items-center justify-between ${
//                   isDark ? 'border-slate-800/80' : 'border-slate-100'
//                 }`}>
//                   <div className="flex flex-col">
//                     <span className="text-xs text-slate-400 font-medium">Price</span>
//                     <span className={`text-base font-bold ${
//                       isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
//                     }`}>
//                       ${product.price}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
//                     <span className="text-amber-400 text-xs">★</span>
//                     <span className={`text-xs font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
//                       {product.rating?.toFixed(1)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && displayedProducts.length === 0 && (
//           <div className={`border rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 ${
//             isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'
//           }`}>
//             <div className="text-5xl">🛍️</div>
//             <h3 className={`text-lg font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
//               No products matched your search
//             </h3>
//             <p className="text-xs text-slate-400">
//               Try adjusting your category selections, search query, or clear your filters to explore more items.
//             </p>
//             <button
//               onClick={resetFilters}
//               className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   )
// }








'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type Product = {
  id: number
  title: string
  brand: string
  price: number
  discountPercentage?: number
  category: string
  images: string[]
  thumbnail?: string
  rating: number
  stock: number
}

export default function Page() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(true)

  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'popularity'>('default')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const nextTheme = !prev
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light')
      return nextTheme
    })
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)

        const allCategories = data.products.map((product: Product) => product.category)
        const uniqueCategories = Array.from(new Set(allCategories)) as string[]

        const allBrands = data.products.map((product: Product) => product.brand).filter(Boolean)
        const uniqueBrands = Array.from(new Set(allBrands)) as string[]

        setCategories(uniqueCategories)
        setBrands(uniqueBrands)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const getFilteredProducts = () => {
    let list = [...products]

    if (categoryFilter) {
      list = list.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    }
    if (brandFilter) {
      list = list.filter(p => p.brand === brandFilter)
    }

    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price)
      case 'price-high':
        return list.sort((a, b) => b.price - a.price)
      case 'popularity':
        return list.sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }

  const resetFilters = () => {
    setCategoryFilter('')
    setBrandFilter('')
    setSortBy('default')
  }

  const displayedProducts = getFilteredProducts()
  const navCategories = ['All', 'beauty', 'fragrances', 'furniture', 'groceries']

  return (
    <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Bar with Theme Toggle */}
        <div className="flex justify-end items-center">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
          </button>
        </div>

        {/* Hero Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
          }`}>
            <span>✨ Exclusive Catalog</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
            isDark 
              ? 'bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
              : 'text-slate-900'
          }`}>
            Discover Tech & Lifestyle
          </h1>
          <p className={`text-sm sm:text-base font-normal leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Browse our top-rated products with real-time filtering and seamless navigation.
          </p>
        </header>

        {/* Category Pill Tabs */}
        <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {navCategories.map(cat => {
            const isActive = categoryFilter === cat.toLowerCase() || (cat === 'All' && categoryFilter === '')
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat === 'All' ? '' : cat.toLowerCase())}
                className={`px-5 py-2.5 rounded-2xl text-xs font-semibold capitalize tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                    : isDark
                      ? 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Control Bar (Filters & Sort) */}
        <div className={`backdrop-blur-xl border rounded-3xl p-4 shadow-2xl flex flex-wrap gap-4 justify-between items-center transition-colors ${
          isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Category Select */}
            <div className="relative flex-1 sm:flex-none">
              <select
                className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer capitalize ${
                  isDark 
                    ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} className={isDark ? 'bg-slate-900' : 'bg-white'}>{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>

            {/* Brand Select */}
            <div className="relative flex-1 sm:flex-none">
              <select
                className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map((brand, idx) => (
                  <option key={idx} value={brand} className={isDark ? 'bg-slate-900' : 'bg-white'}>{brand}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          {/* Sort Select */}
          <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
            <select
              className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-semibold focus:outline-none focus:border-indigo-400 transition-all cursor-pointer ${
                isDark 
                  ? 'bg-indigo-950/50 border-indigo-500/30 text-indigo-300' 
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700'
              }`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="default" className={isDark ? 'bg-slate-900' : 'bg-white'}>Sort by: Featured</option>
              <option value="price-low" className={isDark ? 'bg-slate-900' : 'bg-white'}>Price: Low to High</option>
              <option value="price-high" className={isDark ? 'bg-slate-900' : 'bg-white'}>Price: High to Low</option>
              <option value="popularity" className={isDark ? 'bg-slate-900' : 'bg-white'}>Customer Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`border rounded-3xl p-4 space-y-4 animate-pulse ${
                isDark ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'
              }`}>
                <div className={`aspect-square rounded-2xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-200'}`} />
                <div className={`h-4 rounded-md w-3/4 ${isDark ? 'bg-slate-800/80' : 'bg-slate-200'}`} />
                <div className={`h-3 rounded-md w-1/2 ${isDark ? 'bg-slate-800/50' : 'bg-slate-200'}`} />
              </div>
            ))}
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/features/product/${product.id}`)}
                className={`group relative border rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-sm ${
                  isDark 
                    ? 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10' 
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300 hover:shadow-slate-200'
                }`}
              >
                <div>
                  <div className={`relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border ${
                    isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <img
                      src={product.images?.[0] ?? product.thumbnail ?? ''}
                      alt={product.title}
                      className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                      {product.category && (
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize backdrop-blur-md ${
                          isDark 
                            ? 'bg-slate-950/80 text-slate-300 border-slate-800' 
                            : 'bg-white/90 text-slate-700 border-slate-200 shadow-2xs'
                        }`}>
                          {product.category}
                        </span>
                      )}
                      {product.discountPercentage && (
                        <span className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md">
                          -{Math.round(product.discountPercentage)}%
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className={`font-semibold text-sm transition-colors line-clamp-1 ${
                    isDark ? 'text-slate-100 group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'
                  }`}>
                    {product.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mb-4 mt-1">
                    {product.brand ? `by ${product.brand}` : 'Generic'}
                  </p>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between ${
                  isDark ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Price</span>
                    <span className={`text-base font-bold ${
                      isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                    }`}>
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className={`text-xs font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                      {product.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayedProducts.length === 0 && (
          <div className={`border rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 ${
            isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="text-5xl">🛍️</div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              No products matched your filters
            </h3>
            <p className="text-xs text-slate-400">
              Try adjusting your category or brand selections to explore more items.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}