"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const cart = [
    { id: 1, title: "Product A", price: 19.99, qty: 2 },
    { id: 2, title: "Product B", price: 29.99, qty: 1 }
  ];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <span>{item.title}</span>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                className="border w-20 text-center rounded"
                defaultValue={item.qty}
              />

              <Button variant="outline">Remove</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-semibold">Subtotal: ${subtotal}</div>

      <Button className="mt-4" onClick={() => router.push("/checkout")}>
        Proceed to Checkout
      </Button>
    </div>
  );
}





