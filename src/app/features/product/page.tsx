// 'use client'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// export default function Page() {
//   const router = useRouter()

//   const [products] = useState([
//     {
//       id: 1,
//       title: 'Nike Air Max',
//       brand: 'Nike',
//       price: 120,
//       image:
//         'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D'
//     },
//     {
//       id: 2,
//       title: 'Shirt',
//       brand: 'Zara',
//       price: 150,
//       image:
//         'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpcnRzfGVufDB8fDB8fHww'
//     },
//     {
//       id: 3,
//       title: 'Jeans',
//       brand: 'Denim',
//       price: 100,
//       image:
//         'https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHx8MHx8fDA%3D'
//     },
//     {
//       id: 4,
//       title: 'Headphones',
//       brand: 'Sony',
//       price: 150,
//       image:
//         'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
//     },
//     {
//       id: 5,
//       title: 'Mobile',
//       brand: 'Apple',
//       price: 400,
//       image:
//         'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlfGVufDB8fDB8fHww'
//     },
//     {
//       id: 6,
//       title: 'Bags',
//       brand: 'Gucci',
//       price: 400,
//       image:
//         'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFkaWVzJTIwYmFnc3xlbnwwfHwwfHx8MA%3D%3D'
//     }
//   ])

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Welcome To The Shop</h1>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer space-y-5">
//         {products.map((product) => (
//           <div key={product.id} className="rounded-lg p-4 hover:shadow-lg" onClick={() => router.push(`/features/product/${product.id}`)} >
//             <img src={product.image}  alt={product.title} className="w-full h-48 object-cover mb-2 rounded" />
//             <h2 className="font-semibold text-lg">{product.title}</h2>
//             <p className="text-gray-600 font-bold">Brand: {product.brand}</p>
//             <p className="text-gray-800 font-bold">Price: ${product.price}</p>
//           </div>
//         ))}
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
//   images: string[]
//   thumbnail?: string
// }

// export default function Page() {
//   const router = useRouter()
//   const [products, setProducts] = useState<Product[]>([])

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(data => setProducts(data.products))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="container mx-auto py-8 p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Welcome To The Shop</h1>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer space-y-5">
//         {products.map((product) => (
//           <div key={product.id} className="rounded-lg p-4 hover:shadow-lg" onClick={() => router.push(`/features/product/${product.id}`)} >
//             <img src={product.images?.[0] ?? product.thumbnail ?? ''}  alt={product.title} className="w-full h-48 object-cover mb-2 rounded" />
//             <h2 className="font-semibold text-lg">{product.title}</h2>
//             <p className="text-gray-600 font-bold">Brand: {product.brand}</p>
//             <p className="text-gray-800 font-bold">Price: ${product.price}</p>
//           </div>
//         ))}
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
  images: string[]
  thumbnail?: string
  rating: number
  stock: number
}

export default function Page() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'popularity'>('default')

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error(err));
  }, []);


  const getSortedProducts = () => {
    const productsCopy = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'popularity':
        return productsCopy.sort((a, b) => b.rating - a.rating);
      default:
        return productsCopy;
    }
  }

  const sortedProducts = getSortedProducts();

  return (
    <div className="container mx-auto py-8 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-400">Our Featured Products</h1>
      
      <div className="mb-6 flex justify-end">
        <div className="flex items-center space-x-2">
          {/* <label className="text-blue-400 font-medium">Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border-2 text-blue-900 rounded-lg px-4 py-2 focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Popularity (Rating)</option>
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer space-y-5">
        {sortedProducts.map((product) => (
          <div key={product.id} className="rounded-lg p-4 hover:shadow-lg border border-gray-200" onClick={() => router.push(`/features/product/${product.id}`)} >
            <img src={product.images?.[0] ?? product.thumbnail ?? ''}  alt={product.title} className="w-full h-48 object-cover mb-2 rounded" />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 font-bold">Brand: {product.brand}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-bold">Price: ${product.price}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-gray-600">{product.rating?.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
