'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function Page() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(5.99);
  const [tax, setTax] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Calculate totals
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const calculatedTax = subtotal * 0.08; // 8% tax
    setTotal(subtotal + shippingCost + calculatedTax);
    setTax(calculatedTax);
  }, [cart, shippingCost]);


  const handlePlaceOrder = async () => {   
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.removeItem("cart");
     
      router.push("/");
    } catch (error) {
      console.error("Checkout error:", error);
      setIsProcessing(false);
    }
  };

 
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
        <div className="space-y-6">
       
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name.</Label>
                  <Input type="firstName" placeholder="First Name" />
                </div>

                <div className="space-y-2">
                  <Label>Last Name.</Label>
                  <Input type="lastName" placeholder="Last Name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email.</Label>
                <Input type="email" placeholder="Email" />              
              </div>

              <div className="space-y-2">
                <Label>Phone.</Label>
                <Input type="phone" placeholder="Phone" />              
              </div>

              <div className="space-y-2">
                <Label>Address. </Label>
                <Input type="address" placeholder="Address" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="e-sewa" id="e-sewa" />
                  <Label>E-sewa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="khalti" id="khalti" />
                  <Label>Khalti</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>


        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <div>Total</div>
                  <div>${total.toFixed(2)}</div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-6 text-lg py-3 cursor-pointer" onClick={handlePlaceOrder} disabled={isProcessing}>
                Confirm Order
              </Button>

              <Button variant="outline" className="w-full mt-2 cursor-pointer"onClick={() => router.push("/cart")}>
                Back to Cart
              </Button>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  );
}

