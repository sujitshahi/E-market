"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: ""
  });

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.city || !form.zip) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Order placed!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="space-y-3">
        <input
          className="border w-full p-2 rounded"
          placeholder="Full name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border w-full p-2 rounded"
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="border w-full p-2 rounded"
          placeholder="City"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          className="border w-full p-2 rounded"
          placeholder="ZIP"
          onChange={(e) => setForm({ ...form, zip: e.target.value })}
        />
      </div>

      <h2 className="text-xl mt-8 mb-2 font-semibold">Order Summary</h2>
    
      <Button className="mt-4 w-full" onClick={handleSubmit}>
        Place Order
      </Button>
    </div>
  );
}
