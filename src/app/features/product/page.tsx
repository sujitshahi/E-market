'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type Product = {
  id: number
  title: string
  brand: string
  price: number
  category: string
  images: string[]
  thumbnail?: string
  rating: number
  stock: number
}

export default function Page() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'popularity'>('default') // Made this state variable
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)

        const allCategories = data.products.map((product: Product) => product.category)
        const uniqueCategories = Array.from(new Set(allCategories)) as string[]
        
        const allBrands = data.products.map((product: Product) => product.brand)
        const uniqueBrands = Array.from(new Set(allBrands)) as string[]

        setCategories(uniqueCategories)
        setBrands(uniqueBrands)
      })
      .catch(err => console.error(err))
  }, [])

  const getFilteredProducts = () => {
    let list = [...products]

    
    if (categoryFilter) list = list.filter(p => p.category === categoryFilter)
    if (brandFilter) list = list.filter(p => p.brand === brandFilter)

    
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

  const displayedProducts = getFilteredProducts()

  const navCategories = ['All', 'Men', 'Women', 'Electronics']

  return (
    <div className="container mx-auto py-8 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-400">Our Products</h1>

      <div className="flex justify-center space-x-4 mb-6">
        {navCategories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
              categoryFilter === cat.toLowerCase() || (cat === 'All' && categoryFilter === '')
                ? 'bg-blue-400 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setCategoryFilter(cat === 'All' ? '' : cat.toLowerCase())}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap mb-6 gap-4">
        <select
          className="border-2 text-blue-500 rounded-lg px-4 py-2 focus:outline-none cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="border-2 text-blue-500 rounded-lg px-4 py-2 focus:outline-none cursor-pointer"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand, idx) => (
            <option key={idx} value={brand}>{brand}</option>
          ))}
        </select>

     
        <select
          className="border-2 text-blue-500 rounded-lg px-4 py-2 focus:outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="popularity">Sort By Popularity</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer space-y-5">
        {displayedProducts.map(product => (
          <div
            key={product.id}
            className="rounded-lg p-4 hover:shadow-lg border border-gray-200"
            onClick={() => router.push(`/features/product/${product.id}`)}
          >
            <img
              src={product.images?.[0] ?? product.thumbnail ?? ''}
              alt={product.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 font-bold">Brand: {product.brand}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-bold">Price: ${product.price}</p>
              <div className="flex items-center">
                <div className="text-yellow-500">★</div>
                <div className="ml-1 text-gray-600">{product.rating?.toFixed(1)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayedProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products found.
        </p>
      )}
    </div>
  )
}