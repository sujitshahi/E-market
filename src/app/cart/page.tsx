'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  // FIXED: Load cart from localStorage and listen for storage events
  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCart(storedCart)
    };

    // Load cart on component mount
    loadCart();

    // Listen for storage events (from other tabs/windows)
    const handleStorageChange = () => {
      loadCart();
    };

    // Listen for custom storage events (from same window)
    const handleCustomStorageEvent = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomStorageEvent);
    };
  }, []);

  // FIXED: Recalculate total when cart changes
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    setTotal(newTotal)
  }, [cart])

  const updateQty = (id: number, change: number) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, Math.min(item.qty + change, 10)) }
        : item
    )
    
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('storage'))
  }

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
    window.dispatchEvent(new Event('storage'))
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-xl font-semibold">
        Your cart is empty 🛒
      </div>
    )
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white shadow p-3 rounded-lg">
            <div className="flex items-center gap-4">
              <img 
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2>{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => updateQty(item.id, -1)}
                disabled={item.qty === 1}
              >-</Button>

              <div>{item.qty}</div>

              <Button
                onClick={() => updateQty(item.id, +1)}
                disabled={item.qty === 10}
              >+</Button>
            </div>

            <Button variant="outline" className="text-red-950"  onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
        <Button
        onClick={() => router.push("/checkout")}
         className="mt-4 w-full text-lg py-3 cursor-pointer">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}