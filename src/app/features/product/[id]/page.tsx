'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from 'next/navigation'
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
export default function Page({ data }: any) {
  const router = useRouter()
  const params = useParams();
  const id = params.id
  const [ setCart] = useState<Product[]>([])

  const product = allProducts.find((p) => p.id === Number(id))
  if (!product) return <p>Product not found</p>

    const handleAddToCart = () => {
      alert(`${product.title} added to cart!`)
      router.push('/cart')
    }

    

    const [qty, setqty] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-cover" />
          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-4">Brand: {product.brand}</p>
            <p className="text-xl font-semibold mb-4">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex items-center gap-2">

              <Button
              onClick={() => setqty(qty-1)}
              disabled={qty === 0}
              >prev</Button>
              <h1>{qty}</h1>
              <Button
              onClick={() => setqty(qty+1)}
              disabled={qty === 10}
              >next</Button>
              <Button
              disabled={qty === 0}
               variant={'outline'} onClick={handleAddToCart}>Add to Cart</Button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


