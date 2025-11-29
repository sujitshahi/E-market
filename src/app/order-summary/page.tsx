'use client'

import { useEffect, useState } from "react"

export default function Page() {
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const summary = JSON.parse(localStorage.getItem("orderSummary") || "null")
    setOrder(summary)
  }, [])

  if (!order) {
    return <h2 className="p-6 text-center">No order found</h2>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order Summary</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Date:</strong> {order.date}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Items:</h2>
      <div className="space-y-3">
        {order.items?.map((item: any) => (
          <div key={item.id} className="border p-3 rounded">
            <h3 className="font-medium">{item.title}</h3>
            <p>Qty: {item.qty}</p>
            <p>Price: Rs. {item.price}</p>
            <p>Total: Rs. {item.price * item.qty}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6">
        Grand Total: Rs. {order.totalAmount}
      </h2>
    </div>
  )
}
