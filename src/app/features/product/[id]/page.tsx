'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const products: Product[] = [
  { id: 1, title: 'Nike Air Max', brand: 'Nike', price: 120, description: 'Comfortable running shoes', category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
  { id: 2, title: 'Shirt', brand: 'Zara', price: 150, description: 'Stylish cotton shirt', category: 'clothing', image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?w=500&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Jeans', brand: 'Denim', price: 100, description: 'Classic blue jeans', category: 'clothing', image: 'https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=500&auto=format&fit=crop&q=60' },
  { id: 4, title: 'Headphones', brand: 'Sony', price: 150, description: 'High-quality headphones with rich sound.', category: 'electronics', image: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60' },
  { id: 5, title: 'Mobile Phone', brand: 'Apple', price: 400, description: 'Fast smartphone with long battery life.', category: 'electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60' },
  { id: 6, title: 'Bag', brand: 'Gucci', price: 400, description: 'Elegant handbag for daily use.', category: 'bags', image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60' },
];

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const product = products.find((p) => p.id === id);
  if (!product) return <p className="p-4">Product not found</p>;

  const [qty, setQty] = useState(1);

  // --------------------------
  // FIXED ADD TO CART FUNCTION
  // --------------------------
  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingItem = cart.find((item: any) => item.id === product.id);

      if (existingItem) {
        existingItem.qty += qty; // update qty
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: qty,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Dispatch storage event to sync across tabs/components
      window.dispatchEvent(new Event('storage'));
      
      router.push("/cart"); // redirect to cart
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 object-cover"
          />

          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
            <p className="text-xl font-semibold mb-4">${(product.price * qty).toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-4">
              <Button
                onClick={() => qty > 1 && setQty(qty - 1)}
                disabled={qty === 1}
              >
                -
              </Button>

              <span className="text-lg font-semibold">{qty}</span>

              <Button
                onClick={() => qty < 10 && setQty(qty + 1)}
                disabled={qty === 10}
              >
                +
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}