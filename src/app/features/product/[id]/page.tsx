'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
interface Product {
  id: number
  title: string
  brand: string
  price: number
  description: string
  image: string
  category: string
}


const allProducts: Product[] = [
  { id: 1, title: 'Nike Air Max', brand: 'Nike', price: 120, description: 'Comfortable running shoes', category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Shirt', brand: 'Zara', price: 150, description: 'Stylish cotton shirt', category: 'clothing', image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?w=500&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Jeans', brand: 'Denim', price: 100, description: 'Classic blue jeans', category: 'clothing', image: 'https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=500&auto=format&fit=crop&q=60' },
  { id: 4, title: 'Headphones', brand: 'sony', price: 150, description: 'High-quality headphones with rich sound and deep bass.', category: 'electronics', image: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 5, title: 'Mobile Phones', brand: 'apple', price: 400, description: 'A fast and reliable smartphone with smooth performance and long battery life.', category: 'electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlfGVufDB8fDB8fHww' },
  { id: 6, title: 'Bags', brand: 'Gucci', price: 400, description: 'Elegant and spacious handbag designed for daily use with a modern style.', category: 'electronics', image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFkaWVzJTIwYmFnc3xlbnwwfHwwfHx8MA%3D%3D' },

]
export default function Page() {
  const router = useRouter()
  const params = useParams()
  const id = params.id


  const [cart, setCart] = useState<Product[]>([])

  const product = allProducts.find((p) => p.id === Number(id))
  if (!product) return <p>Product not found</p>

  const handleAddToCart = () => {
    setCart([...cart, product])
    alert(`${product.title} added to cart!`)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.title} className="w-full md:w-1/3 h-64 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2">{product.description}</p>
          <p className="mt-4 font-semibold text-2xl">${product.price}</p>
          <Button className='border-2 mt-3'  onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
