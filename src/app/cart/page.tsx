'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCart(storedCart)
    };
    loadCart();
  }, []);

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
   
  }

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
    toast.success("Item removed from cart");
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-xl font-semibold flex justify-items-center flex-col gap-4">
       <div className='h-85 space-y-4'>
        <div> Your cart is empty 🛒
         Looks like you haven't added anything to your cart yet.</div>
        <div className="space-x-4">
          <Button className="border-black border-2 font-bold cursor-pointer" onClick={() => router.push("/order-summary")}>Your Order</Button>
          <Button className="border-black border-2 font-bold cursor-pointer" onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
       </div>
      </div>      
    )
  }


  return (
    
    <div className="container mx-auto font-bold">
     
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Your Cart</h1>

      <div>
        
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between shadow p-3 bg-gray-500 ">
            <div className="flex items-center gap-4">
              <img 
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2>{item.title}</h2>
                <p className="">${item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
             <Button onClick={() => updateQty(item.id, -1)} disabled={item.qty === 1} >
                -
              </Button>

              <div>{item.qty}</div>

              <Button onClick={() => updateQty(item.id, +1)} disabled={item.qty === 10} >
                +            
              </Button> 
            </div>

            <Button variant="outline" className="border-red-400 border-2 cursor-pointer" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </div>
        ))}
        
        <div className=" p-4 bg-gray-500">
          <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
          <Button
          onClick={() => router.push("/checkout")}
          className="mt-4 w-full text-lg py-3 cursor-pointer ">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}