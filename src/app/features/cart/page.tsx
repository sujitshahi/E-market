'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const allProducts = [
  { id: 1, title: 'Nike Air Max', price: 120 },
  { id: 2, title: 'Zara Shirt', price: 150 },
  { id: 3, title: 'Denim Jeans', price: 100 }
]

export default function Page() {
  const params = useSearchParams()
  const productId = Number(params.get('id'))

  // Add product to cart if added from product page
  const initialItem = allProducts.find((p) => p.id === productId)

  const [cart, setCart] = useState(
    initialItem
      ? [{ ...initialItem, qty: 1 }]
      : []
  )

  const increaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  const decreaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-3 mb-3 rounded"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p>${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">Subtotal: ${subtotal}</h2>

          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  )
}
