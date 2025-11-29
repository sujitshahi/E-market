'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()

  const [products] = useState([
    {
      id: 1,
      title: 'Nike Air Max',
      brand: 'Nike',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 2,
      title: 'Shirt',
      brand: 'Zara',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpcnRzfGVufDB8fDB8fHww'
    },
    {
      id: 3,
      title: 'Jeans',
      brand: 'Denim',
      price: 100,
      image:
        'https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 4,
      title: 'Headphones',
      brand: 'Sony',
      price: 150,
      image:
        'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 5,
      title: 'Mobile',
      brand: 'Apple',
      price: 400,
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlfGVufDB8fDB8fHww'
    },
    {
      id: 6,
      title: 'Bags',
      brand: 'Gucci',
      price: 400,
      image:
        'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFkaWVzJTIwYmFnc3xlbnwwfHwwfHx8MA%3D%3D'
    }
  ])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Welcome To The Shop</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg p-4 hover:shadow-lg"
            onClick={() => router.push(`/features/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 font-bold">Brand: {product.brand}</p>
            <p className="text-gray-800 font-bold">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
