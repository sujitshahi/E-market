'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

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

async function fetchProductsData(signal: AbortSignal) {
  const res = await fetch('https://dummyjson.com/products', { signal })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  const loadProducts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const controller = new AbortController()
      const activeSignal = signal || controller.signal

      const data = await fetchProductsData(activeSignal)
      
      if (activeSignal.aborted) return

      const fetchedProducts: Product[] = data.products || []
      setProducts(fetchedProducts)

      const allCategories = fetchedProducts.map((product) => product.category)
      const uniqueCategories = Array.from(new Set(allCategories))

      const allBrands = fetchedProducts.map((product) => product.brand).filter(Boolean)
      const uniqueBrands = Array.from(new Set(allBrands))

      setCategories(uniqueCategories)
      setBrands(uniqueBrands)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      console.error(err)
      setError('Unable to load products. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadProducts(controller.signal)

    return () => {
      controller.abort()
    }
  }, [loadProducts])

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
        return list.slice().sort((a, b) => a.price - b.price)
      case 'price-high':
        return list.slice().sort((a, b) => b.price - a.price)
      case 'popularity':
        return list.slice().sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }

  const displayedProducts = getFilteredProducts()

  return (
    <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
          </button>
        </div>

        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
          }`}>
            <span>✨ All-in-One Collection</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
            isDark 
              ? 'bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
              : 'text-slate-900'
          }`}>
            Quality Goods for <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Every Lifestyle.
            </span>
          </h1>
          <p className={`text-sm sm:text-base font-normal leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            From trending electronics and beauty products to everyday essentials—explore our full catalog with instant search and live category filters.
          </p>
        </header>

        {error && (
          <div className={`border rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 ${
            isDark ? 'bg-slate-900/40 border-red-900/50 text-slate-200' : 'bg-white border-red-200 text-slate-800'
          }`}>
            <div className="text-5xl">📡</div>
            <h3 className="text-lg font-bold">You are offline</h3>
            <p className="text-xs text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => loadProducts()}
              className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && (
          <>
            <div className={`backdrop-blur-xl border rounded-3xl p-4 shadow-2xl flex flex-wrap gap-4 justify-between items-center transition-colors ${
              isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
            }`}>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">

                <div className="relative flex-1 sm:flex-none">
                  <select
                    aria-label="Filter products by category"
                    className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer capitalize ${
                      isDark 
                        ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className={isDark ? 'bg-slate-900' : 'bg-white'}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select
                    aria-label="Filter products by brand"
                    className={`w-full appearance-none border rounded-2xl px-4 py-2.5 pr-9 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer ${
                      isDark 
                        ? 'bg-slate-950/80 border-slate-800 text-slate-300' 
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand} className={isDark ? 'bg-slate-900' : 'bg-white'}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 sm:flex-none w-full sm:w-auto">
                <select
                  aria-label="Sort products"
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

            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/features/product/${product.id}`}
                    className={`group relative border rounded-3xl p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-xs ${
                      isDark 
                        ? 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10' 
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-indigo-300 hover:shadow-slate-200'
                    }`}
                  >
                    <div>
                      <div className={`relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border ${
                        isDark ? 'bg-slate-950/60 border-slate-800/50' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <Image
                          src={product.images?.[0] ?? product.thumbnail ?? ''}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none z-10">
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
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}